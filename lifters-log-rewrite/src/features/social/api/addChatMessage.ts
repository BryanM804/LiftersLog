import { SERVER_URL } from "../../../utils/constants";

type NewChatMessage = {
    text: string;
    roomid: number;
}

async function addChatMessage(newChatMessage: NewChatMessage) {
    const response = await fetch(`${SERVER_URL}/chat`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newChatMessage)
    });

    return response.json();
}

export default addChatMessage;