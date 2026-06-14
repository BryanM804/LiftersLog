import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function requestVerification(token: string) {
    const response = await fetch(`${SERVER_URL}/auth/requestverification`, {
        method: "POST",
        body: JSON.stringify({ token: token }),
        headers: {"Content-type": "application/json"}
    });
    return await checkStatus(response);
}

export default requestVerification;