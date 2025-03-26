import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getUsersWithAccess(roomid: number) {
    const response = await fetch(`${SERVER_URL}/chat/users/${roomid}`, {
        method: "GET",
        credentials: "include"
    });

    return checkStatus(response, "Unable to get users with chat access.");
}

export default getUsersWithAccess;