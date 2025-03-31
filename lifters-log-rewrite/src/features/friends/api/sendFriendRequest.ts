import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type FriendRequest = {
    username: string;
}

async function sendFriendRequest(newFriendRequest: FriendRequest) {
    const response = await fetch(`${SERVER_URL}/friend/request`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newFriendRequest)
    });

    return checkStatus(response, "Unable to send friend request")
}

export default sendFriendRequest;