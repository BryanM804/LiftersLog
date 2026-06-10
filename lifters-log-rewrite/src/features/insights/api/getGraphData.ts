import { QueryFunctionContext } from "@tanstack/react-query";
import { SERVER_URL } from "../../../utils/constants";
import checkStatus from "../../../utils/api/checkStatus";

async function getGraphData({ queryKey }: QueryFunctionContext<[string, number, string, string]>) {
    const [, exerciseid, timeframe, metric] = queryKey

    if (exerciseid < 1) return 

    const response = await fetch(`${SERVER_URL}/graph/${exerciseid}/${timeframe}/${metric}`, {
        method: "GET",
        credentials: "include"
    })

    return await checkStatus(response)
}

export default getGraphData