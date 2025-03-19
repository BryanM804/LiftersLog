import { SERVER_URL } from "../../../utils/constants";


async function getChatRooms() {
    const response = await fetch(`${SERVER_URL}/chatrooms`, {
        method: "GET",
        credentials: "include"
    });

    return response.json();
}

export default getChatRooms;