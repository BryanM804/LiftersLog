import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getUserPreferences() {
    const response = await fetch(`${SERVER_URL}/profile/preferences`, {
        method: "GET",
        credentials: "include"
    });

    return checkStatus(response)
}

export default getUserPreferences;