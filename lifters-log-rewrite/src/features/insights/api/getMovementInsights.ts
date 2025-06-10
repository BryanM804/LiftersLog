import { QueryFunctionContext } from "@tanstack/react-query";
import { SERVER_URL } from "../../../utils/constants";
import checkStatus from "../../../utils/api/checkStatus";


async function getMovementInsights({ queryKey }: QueryFunctionContext<[string, string, string]>) {
    const [, movement, timeframe] = queryKey

    const response = await fetch(`${SERVER_URL}/stats/${movement}/${timeframe}`, {
        method: "GET",
        credentials: "include"
    });

    return await checkStatus(response)
}

export default getMovementInsights