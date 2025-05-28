import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type NewPreferences = {
    logActivity: boolean;
    noteActivity: boolean;
    labelActivity: boolean;
    splitsMovements: boolean;
}

async function setPreferences(preferences: NewPreferences) {
    const response = await fetch(`${SERVER_URL}/profile/preferences`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(preferences)
    });

    return checkStatus(response);
}

export default setPreferences;