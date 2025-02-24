import { useQuery } from "@tanstack/react-query"
import getChatRooms from "../api/getChatRooms"

function ChatRoomList() {

    const { data, error, isLoading } = useQuery({
        queryKey: ["chatrooms"],
        queryFn: getChatRooms
    })

    return (
        <div className="chatRoomList">
            <ul>

            </ul>
        </div>
    )
}

export default ChatRoomList