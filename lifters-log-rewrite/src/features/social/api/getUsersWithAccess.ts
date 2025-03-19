import { SERVER_URL } from "../../../utils/constants";


async function getUsersWithAccess(roomid: number) {
    const response = await fetch(`${SERVER_URL}/chat/users/${roomid}`, {
        method: "GET",
        credentials: "include"
    });

    if (response.status == 200) {
        return response.json();
    } else {
        throw new Error("Unable to get users with chat access.")
    }
}

export default getUsersWithAccess;