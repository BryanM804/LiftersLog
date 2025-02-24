import { SERVER_URL } from "../../../utils/constants";

async function getUserStats() {
    const response = await fetch(`${SERVER_URL}/profile`, {
        method: "GET",
        credentials: "include" // include credentials to send auth cookie
    });
    return response.json();
}

export default getUserStats;