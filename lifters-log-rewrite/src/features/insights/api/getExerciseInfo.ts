import { QueryFunctionContext } from "@tanstack/react-query";
import { SERVER_URL } from "../../../utils/constants";
import checkStatus from "../../../utils/api/checkStatus";

async function getExericseInfo({ queryKey }: QueryFunctionContext<[string, number]>) {
    const [, exerciseid] = queryKey

    if (exerciseid < 1) return;

    const response = await fetch(`${SERVER_URL}/insights/exerciseinfo/${exerciseid}`, {
        method: "GET",
        credentials: "include"
    });

    return await checkStatus(response)
}

export default getExericseInfo;