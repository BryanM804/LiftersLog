import { QueryFunctionContext } from "@tanstack/react-query";
import { SERVER_URL } from "../../../utils/constants";
import checkStatus from "../../../utils/api/checkStatus";


async function getUserGraphData({ queryKey }: QueryFunctionContext<[string, string]>) {
    const [, timeframe] = queryKey

    const response = await fetch(`${SERVER_URL}/insightsgraph/${timeframe}`, {
        method: "GET",
        credentials: "include"
    });

    return await checkStatus(response)
}

export default getUserGraphData