import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import { useState } from "react";
import ProfilePicture from "../../../components/ProfilePicture";
import ProfileRecords from "./ProfileRecords";
import EditUserProfile from "./EditUserProfile";
import ProfileStats from "./ProfileStats";
import getUserStats from "../api/getUserStats";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import { useQuery } from "@tanstack/react-query";
import { isMobile } from "react-device-detect";


function UserProfile() {
    
    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    const [isEditing, setIsEditing] = useState(false)

    const { data, error, isLoading } = useQuery({
        queryKey: ["stats"],
        queryFn: getUserStats
    });

    const pfpSize = isMobile ? 128 : 256
    
    if (isLoading) return <Loading />

    if (error) return <ServerError error={error} />

    if (isEditing)
        return (
            <EditUserProfile cancelFn={() => setIsEditing(false)} pfpurl={data.pfpurl}/>
        )

    return (
        <div className="userProfileContainer">
            <h3>{authUser && authUser.username}<hr /></h3>
            <div className="profileContainer">
                <div className="profilePictureContainer">
                    <ProfilePicture imageURL={data.pfpurl} size={pfpSize}/>
                    <button className="floatingButton menuButton"
                        style={{width: pfpSize, margin: "0.25rem", marginLeft: "0"}}
                        onClick={() => setIsEditing(true)}
                    >
                    Edit Profile
                    </button>
                </div>
                <div className="profileDescription">
                    <ProfileStats stats={data}/>
                </div>
                <div className="userRecords">
                    <ProfileRecords editable={true} />
                </div>
            </div>
        </div>
    )
}

export default UserProfile;