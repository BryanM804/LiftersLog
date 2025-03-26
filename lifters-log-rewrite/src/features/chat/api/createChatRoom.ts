import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type NewChatRoom = {
    name: string;
    roomid?: number;
    description: string;
    newRoom?: boolean;
}

async function createChatRoom(newChatRoom: NewChatRoom) {
    const fetchURL = newChatRoom.newRoom ? `${SERVER_URL}/chat/room` : `${SERVER_URL}/chat/room/edit`;

    const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newChatRoom)
    });

    return checkStatus(response, "User already has a chatroom.")
}

export default createChatRoom;