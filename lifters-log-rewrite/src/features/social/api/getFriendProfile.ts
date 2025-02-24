import { SERVER_URL } from "../../../utils/constants";


async function getFriendProfile(username: string) {
    const response = await fetch(`${SERVER_URL}/friend/${username}`, {
        method: "GET",
        credentials: "include"
    });
    return response.json();
}

export default getFriendProfile