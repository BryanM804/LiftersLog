import { SERVER_URL } from "../../../utils/constants";


async function getChatRooms() {
    const response = await fetch(`${SERVER_URL}/chat/channels`, {
        method: "GET",
        credentials: "include"
    });
    return response.json();
}

export default getChatRooms;