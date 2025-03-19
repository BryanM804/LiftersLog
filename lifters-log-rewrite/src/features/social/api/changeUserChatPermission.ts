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

    if (response.status == 200) {
        return response.json();
    } else {
        throw new Error("Unable to add user.")
    }
}

export default changeUserChatPermission;