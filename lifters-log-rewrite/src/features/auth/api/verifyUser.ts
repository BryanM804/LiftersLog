import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function verifyUser(token: string) {
    const response = await fetch(`${SERVER_URL}/auth/verifyemail`, {
        method: "POST",
        body: JSON.stringify({ token: token }),
        headers: {"Content-type": "application/json"}
    });
    return await checkStatus(response);
}

export default verifyUser;