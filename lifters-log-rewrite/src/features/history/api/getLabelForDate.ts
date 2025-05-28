import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getLabelForDate({ queryKey }: QueryFunctionContext<[string, string]>) {
    const [, date] = queryKey

    const response = await fetch(`${SERVER_URL}/label/${date}`, {
        method: "GET",
        credentials: "include"
    });
    
    return checkStatus(response);
}

export default getLabelForDate;