import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type UserLogin = {
    username: string;
    password: string;
}

async function authenticateUser(userLogin: UserLogin) {
    const response = await fetch(`${SERVER_URL}/auth`, {
        method: "POST",
        body: JSON.stringify(userLogin),
        headers: {"Content-type": "application/json"}
    });
    return await checkStatus(response);
}

export default authenticateUser;