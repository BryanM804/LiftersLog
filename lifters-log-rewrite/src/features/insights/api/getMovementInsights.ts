import { QueryFunctionContext } from "@tanstack/react-query";
import { SERVER_URL } from "../../../utils/constants";
import checkStatus from "../../../utils/api/checkStatus";


async function getMovementInsights({ queryKey }: QueryFunctionContext<[string, string]>) {
    const [, movement] = queryKey

    const response = await fetch(`${SERVER_URL}/stats/${movement}`, {
        method: "GET",
        credentials: "include"
    });

    return await checkStatus(response)
}

export default getMovementInsights