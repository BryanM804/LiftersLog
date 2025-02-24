import { SERVER_URL } from "../../../utils/constants";

async function getHistoryGroupsForDate(date: string) {
    const response = await fetch(`${SERVER_URL}/historygroups/${date}`, {
        method: "GET",
        credentials: "include"
    });
    return response.json();
}

export default getHistoryGroupsForDate;