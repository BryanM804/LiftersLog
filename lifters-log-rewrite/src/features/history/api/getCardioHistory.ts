import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getCardioHistory(date: string) {
    const response = await fetch(`${SERVER_URL}/cardiohistory/${date}`, {
        method: "GET",
        credentials: "include"
    })

    return checkStatus(response);
}

export default getCardioHistory