import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getUserRecords() {
    const response = await fetch(`${SERVER_URL}/records`, {
        method: "GET",
        credentials: "include"
    });

    return checkStatus(response);
}

export default getUserRecords;