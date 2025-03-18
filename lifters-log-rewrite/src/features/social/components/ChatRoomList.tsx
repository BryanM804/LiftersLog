import { useQuery } from "@tanstack/react-query"
import getChatRooms from "../api/getChatRooms"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import ChatRoomItem from "./ChatRoomItem"

type ChatRoomList = {
    setActiveChatRoom: (x: number) => void;
    setInChatRoom: (x: boolean) => void;
}

function ChatRoomList({ setActiveChatRoom, setInChatRoom }: ChatRoomList) {

    const { data, error, isLoading } = useQuery({
        queryKey: ["chatrooms"],
        queryFn: getChatRooms
    })

    function handleRoomClick(roomid: number) {
        setActiveChatRoom(roomid);
        setInChatRoom(true);
    }

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error}/>

    return (
        <div className="chatRoomListContainer">
            <ul className="chatRoomList">
                <ChatRoomItem name="Global" description="Global chatroom" onClick={() => handleRoomClick(1)} />
                {
                    data.length > 0 &&
                    data.map((chatroom: {name: string; description: string; roomid: number;}) =>
                        <ChatRoomItem 
                            key={chatroom.roomid} 
                            name={chatroom.name} 
                            description={chatroom.description} 
                            onClick={() => handleRoomClick(chatroom.roomid)}
                            />
                    )
                }
            </ul>
        </div>
    )
}

export default ChatRoomList