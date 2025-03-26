import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getFriendList() {
    const response = await fetch(`${SERVER_URL}/friends`,{
        method: "GET",
        credentials: "include"
    });
    
    return checkStatus(response);
}

export default getFriendList;