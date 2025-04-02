import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getFriendList(requests: boolean) {

    const url = `${SERVER_URL}/${ requests ? "requests" : "friends"}`

    const response = await fetch(url ,{
        method: "GET",
        credentials: "include"
    });

    return checkStatus(response);
}

export default getFriendList;