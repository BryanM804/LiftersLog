import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import XpBar from "../../../components/XpBar";
import { useQuery } from "@tanstack/react-query";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import getUserStats from "../api/getUserStats";
import ProfilePictureChanger from "./ProfilePictureChanger";
import PreferenceMenu from "./PreferenceMenu";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import { useState } from "react";
import ProfilePicture from "../../../components/ProfilePicture";
import ToggleSwitch from "../../../components/ToggleSwitch";
import ProfileRecords from "./ProfileRecords";


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
            <div className="userProfileContainer">
            <h3>{authUser && authUser.username}<hr /></h3>
            <div className="profilePictureContainer">
                <ProfilePictureChanger imageURL={data.pfpurl} size={128}/>
            </div>
            Level: {data.level}
            <br />
            <XpBar value={data.xp} max={data.level * 1500}/>
            <br />
            Total Weight Lifted: {data.totalweight}
            <PreferenceMenu />
            </div>
        )

    return (
        <div className="userProfileContainer">
            <h3>{authUser && authUser.username}<hr /></h3>
            <div className="profileContainer">
            <div className="profilePictureContainer">
                <ProfilePicture imageURL={data.pfpurl} size={128}/>
            </div>
            <div className="profileDescription">
                <span style={{fontWeight: "bold"}}>Level {data.level}</span>
                <br />
                <XpBar value={data.xp} max={data.level * 1500}/>
                <div style={{fontWeight: "bold"}}>Weight Lifted</div>
                {data.totalweight}
                <br />
                <div style={{fontWeight: "bold"}}>Sets Logged</div>
                {data.totalsets}
                <br />
                <ProfileRecords />
            </div>
            </div>
        </div>
    )
}

export default UserProfile;