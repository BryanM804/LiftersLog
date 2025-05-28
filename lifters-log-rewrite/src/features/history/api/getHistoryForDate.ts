import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getHistoryForDate({ queryKey }: QueryFunctionContext<[string, string, string, string]>) {
    const [, , date, movement] = queryKey

    const response = await fetch(`${SERVER_URL}/history/${movement}/${date}`, {
        method: "GET",
        credentials: "include"
    });
    
    return checkStatus(response);
}

export default getHistoryForDate;