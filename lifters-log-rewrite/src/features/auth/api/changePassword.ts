import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type NewPasswordInfo = {
    newPassword: string;
    email: string;
}

async function changePassword(newInfo: NewPasswordInfo) {
    const response = await fetch(`${SERVER_URL}/auth/changepassword`, {
        method: "POST",
        body: JSON.stringify(newInfo),
        headers: {"Content-type": "application/json"}
    });
    return await checkStatus(response);
}

export default changePassword