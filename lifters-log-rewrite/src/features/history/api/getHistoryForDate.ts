import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getHistoryForDate(date: string, movement: string) {
    const response = await fetch(`${SERVER_URL}/history/${movement}/${date}`, {
        method: "GET",
        credentials: "include"
    });
    
    return checkStatus(response);
}

export default getHistoryForDate;