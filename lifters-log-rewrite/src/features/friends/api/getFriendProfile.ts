import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getFriendProfile(username: string) {
    const response = await fetch(`${SERVER_URL}/friend/${username}`, {
        method: "GET",
        credentials: "include"
    });
    
    return await checkStatus(response);
}

export default getFriendProfile