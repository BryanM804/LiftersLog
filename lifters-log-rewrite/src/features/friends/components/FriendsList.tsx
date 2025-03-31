import { useQuery } from "@tanstack/react-query";
import getFriendList from "../api/getFriendList";
import ServerError from "../../../components/ServerError";
import Loading from "../../../components/Loading";
import Friend from "./Friend";


function FriendsList() {

    const { data, error, isLoading } = useQuery({
        queryKey: ["friends"],
        queryFn: getFriendList
    })  

    if (error) return <ServerError error={error} />
    if (isLoading) return <Loading />

    return (
        <div className="friendListContainer">
            <ul className="friendList">
                {
                    (data && data.length > 0) ?
                        data.map((friend: {username: string, level: number, id: number, pfpurl: string}) => 
                            <Friend 
                                username={friend.username} 
                                level={friend.level} 
                                imageURL={friend.pfpurl}
                                key={friend.id} 
                            />
                        )
                    :
                    <div className="darkFont">Looks like you have no friends {":("}</div>
                }
            </ul>
        </div>
    )
}

export default FriendsList;