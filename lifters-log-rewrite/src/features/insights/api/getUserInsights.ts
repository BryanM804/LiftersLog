import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getUserInsights() {

    const response = await fetch(`${SERVER_URL}/insights`, {
        method: "GET",
        credentials: "include"
    });

    return await checkStatus(response)
}

export default getUserInsights