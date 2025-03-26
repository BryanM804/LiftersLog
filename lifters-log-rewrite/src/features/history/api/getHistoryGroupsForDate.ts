import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getHistoryGroupsForDate(date: string) {
    const response = await fetch(`${SERVER_URL}/historygroups/${date}`, {
        method: "GET",
        credentials: "include"
    });
    
    return checkStatus(response);
}

export default getHistoryGroupsForDate;