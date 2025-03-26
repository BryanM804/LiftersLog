import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type NewChatUser = {
    username: string;
    chatPermission: boolean;
    roomid: number;
}

async function changeUserChatPermission(newUser: NewChatUser) {
    const response = await fetch(`${SERVER_URL}/chat/changeaccess`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser)
    });

    return checkStatus(response, "Unable to add user.")
}

export default changeUserChatPermission;