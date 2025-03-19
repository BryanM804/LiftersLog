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

    if (response.status == 200) {
        return response.json();
    } else {
        throw new Error("Unable to delete chat room.")
    }
    
}

export default deleteChatRoom;