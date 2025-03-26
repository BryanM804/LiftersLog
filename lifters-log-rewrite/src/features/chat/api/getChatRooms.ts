import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getChatRooms() {
    const response = await fetch(`${SERVER_URL}/chatrooms`, {
        method: "GET",
        credentials: "include"
    });

    return checkStatus(response)
}

export default getChatRooms;