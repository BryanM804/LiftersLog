import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getCardioHistory({ queryKey }: QueryFunctionContext<[string, string, string]>) {
    const [, , date] = queryKey

    const response = await fetch(`${SERVER_URL}/cardiohistory/${date}`, {
        method: "GET",
        credentials: "include"
    })

    return checkStatus(response);
}

export default getCardioHistory