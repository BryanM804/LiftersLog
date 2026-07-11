import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function updateUsername(username: string) {
    const response = await fetch(`${SERVER_URL}/profile/changeusername`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username: username })
    });

    return await checkStatus(response);
}

export default updateUsername;