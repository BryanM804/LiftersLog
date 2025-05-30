import { useQuery } from "@tanstack/react-query";
import getFriendList from "../api/getFriendList";
import ServerError from "../../../components/ServerError";
import Loading from "../../../components/Loading";
import FriendRequest from "./FriendRequest";


function RequestList() {

    const { data, error, isLoading } = useQuery({
        queryKey: ["requests", true],
        queryFn: getFriendList
    });

    if (error) return <ServerError error={error} />
    if (isLoading) return <Loading />

    if (data && data.length == 0) return <></>

    return (
        <div className="friendListContainer">
            Requests
            <hr />
            <ul className="friendList">
                {
                    (data && data.length > 0) &&
                        data.map((friend: {username: string, id: number, pfpurl: string}) => 
                            <FriendRequest
                                username={friend.username} 
                                imageURL={friend.pfpurl}
                                key={friend.id} 
                            />
                        )
                }
            </ul>
            <hr />
        </div>
    )
}

export default RequestList;