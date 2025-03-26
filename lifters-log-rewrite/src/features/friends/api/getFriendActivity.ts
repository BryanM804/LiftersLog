import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getFriendActivity(timeframe: string) {
    const validTimeframes = ["today", "recent"]

    if (!validTimeframes.includes(timeframe)) throw new Error("Invalid timeframe")

    const response = await fetch(`${SERVER_URL}/activity/${timeframe}`, {
        method: "GET",
        credentials: "include"
    });
    
    return checkStatus(response)
}

export default getFriendActivity;