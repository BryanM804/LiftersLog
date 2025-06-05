import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type DeletedChatRoom = {
    roomid: number;
}

async function deleteChatRoom(deletedRoom: DeletedChatRoom) {
    const response = await fetch(`${SERVER_URL}/chat/room`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(deletedRoom)
    });

    return await checkStatus(response)
}

export default deleteChatRoom;