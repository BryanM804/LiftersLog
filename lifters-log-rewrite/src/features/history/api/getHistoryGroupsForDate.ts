import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getHistoryGroupsForDate({ queryKey }: QueryFunctionContext<[string, string]>) {
    const [, date] = queryKey

    const response = await fetch(`${SERVER_URL}/historygroups/${date}`, {
        method: "GET",
        credentials: "include"
    });
    
    return await checkStatus(response);
}

export default getHistoryGroupsForDate;