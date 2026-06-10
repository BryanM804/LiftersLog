import { QueryFunctionContext } from "@tanstack/react-query";
import { SERVER_URL } from "../../../utils/constants";
import checkStatus from "../../../utils/api/checkStatus";


async function getMovementInsights({ queryKey }: QueryFunctionContext<[string, number, string]>) {
    const [, exerciseid, timeframe] = queryKey

    if (exerciseid < 1) return;

    const response = await fetch(`${SERVER_URL}/stats/${exerciseid}/${timeframe}`, {
        method: "GET",
        credentials: "include"
    });

    return await checkStatus(response)
}

export default getMovementInsights