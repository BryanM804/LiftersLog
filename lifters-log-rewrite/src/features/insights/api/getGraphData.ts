import { QueryFunctionContext } from "@tanstack/react-query";
import { SERVER_URL } from "../../../utils/constants";
import checkStatus from "../../../utils/api/checkStatus";

async function getGraphData({ queryKey }: QueryFunctionContext<[string, string, string, string]>) {
    const [, movement, timeframe, metric] = queryKey

    const response = await fetch(`${SERVER_URL}/graph/${movement}/${timeframe}/${metric}`, {
        method: "GET",
        credentials: "include"
    })

    return checkStatus(response)
}

export default getGraphData