import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getChatMessages(roomid: number) {
    const response = await fetch(`${SERVER_URL}/chat/${roomid}`, {
        method: "GET",
        credentials: "include"
    });

    return checkStatus(response)
}

export default getChatMessages;