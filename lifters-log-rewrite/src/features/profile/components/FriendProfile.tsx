import { useQuery } from "@tanstack/react-query";
import getFriendStats from "../api/getFriendStats";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import ProfilePicture from "../../../components/ProfilePicture";
import ProfileStats from "./ProfileStats";
import ProfileRecords from "./ProfileRecords";

type FriendProfileProps = {
    username: string;
}

function FriendProfile({ username }: FriendProfileProps) {

    const { data, error, isLoading } = useQuery({
        queryKey: ["stats", username],
        queryFn: getFriendStats
    });
    
    if (isLoading) return <Loading />

    if (error) return <ServerError error={error} />

    return (
        <div className="userProfileContainer">
            <h3>{username}<hr /></h3>
            <div className="profileContainer">
                <div className="profilePictureContainer">
                    <ProfilePicture imageURL={data.pfpurl} size={128}/>
                </div>
                <div className="profileDescription">
                    <ProfileStats stats={data}/>
                </div>
                <div className="userRecords">
                    <ProfileRecords />
                </div>
            </div>
        </div>
    )
}

export default FriendProfile;