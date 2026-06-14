import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function updateEmail(email: string) {
    const response = await fetch(`${SERVER_URL}/profile/changeemail`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email })
    });

    return await checkStatus(response);
}

export default updateEmail;