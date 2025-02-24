import { SERVER_URL } from "../../../utils/constants";


async function getFriendList() {
    const response = await fetch(`${SERVER_URL}/friends`,{
        method: "GET",
        credentials: "include"
    });
    return response.json();
}

export default getFriendList;