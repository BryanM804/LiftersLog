import { useQuery } from "@tanstack/react-query"
import getChatRooms from "../api/getChatRooms"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import ChatRoomItem from "./ChatRoomItem"
import ChatRoom from "../types/ChatRoom"

type ChatRoomListProps = {
    setActiveChatRoom: (x: ChatRoom) => void;
}

function ChatRoomList({ setActiveChatRoom }: ChatRoomListProps) {

    const { data, error, isLoading } = useQuery({
        queryKey: ["chatrooms"],
        queryFn: getChatRooms
    })

    function handleRoomClick(roomid: number, creatorid: number, name: string, description: string) {
        const room: ChatRoom = {
            name: name,
            description: description,
            roomid: roomid,
            creatorid: creatorid
        }
        setActiveChatRoom(room);
    }

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error}/>

    return (
        <div className="chatRoomListContainer">
            <ul className="chatRoomList">
                <ChatRoomItem name="Global" description="Global chatroom" onClick={() => handleRoomClick(1, 0, "Global", "Global chat")} />
                {
                    data.length > 0 &&
                    data.map((cr: {ChatRoom: {name: string; description: string; roomid: number; creatorid: number}}) =>
                        <ChatRoomItem 
                            key={cr.ChatRoom.roomid} 
                            name={cr.ChatRoom.name} 
                            description={cr.ChatRoom.description}
                            onClick={() => handleRoomClick(
                                cr.ChatRoom.roomid, 
                                cr.ChatRoom.creatorid,
                                cr.ChatRoom.name,
                                cr.ChatRoom.description)}
                            />
                    )
                }
            </ul>
        </div>
    )
}

export default ChatRoomList