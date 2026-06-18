import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function requestPasswordChange(email: string) {
    const response = await fetch(`${SERVER_URL}/auth/requestpasswordchange`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email })
    });

    return await checkStatus(response);
}

export default requestPasswordChange;