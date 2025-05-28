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


function UserProfile() {
    
    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    const [isEditing, setIsEditing] = useState(false)

    const { data, error, isLoading } = useQuery({
        queryKey: ["stats"],
        queryFn: getUserStats
    });
    
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
                    <ProfilePicture imageURL={data.pfpurl} size={128}/>
                    <button className="floatingButton menuButton"
                        style={{width: "128px"}}
                        onClick={() => setIsEditing(true)}
                    >
                    Edit
                    </button>
                </div>
                <div className="profileDescription">
                    <ProfileStats stats={data}/>
                    <ProfileRecords />
                </div>
            </div>
        </div>
    )
}

export default UserProfile;