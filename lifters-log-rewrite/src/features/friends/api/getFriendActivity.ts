import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getFriendActivity({ queryKey }: QueryFunctionContext<[string, string]>) {
    const [, friend] = queryKey

    const response = await fetch(`${SERVER_URL}/activity/${friend}`, {
        method: "GET",
        credentials: "include"
    });
    
    return await checkStatus(response)
}

export default getFriendActivity;