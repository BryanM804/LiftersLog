import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getUserStats() {
    const response = await fetch(`${SERVER_URL}/profile`, {
        method: "GET",
        credentials: "include" // include credentials to send auth cookie
    });
    return await checkStatus(response);
}

export default getUserStats;