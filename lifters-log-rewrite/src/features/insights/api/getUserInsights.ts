import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getUserInsights({ queryKey }: QueryFunctionContext<[string, string]>) {
    const [, timeframe] = queryKey

    const response = await fetch(`${SERVER_URL}/insights/${timeframe}`, {
        method: "GET",
        credentials: "include"
    });

    return checkStatus(response)
}

export default getUserInsights