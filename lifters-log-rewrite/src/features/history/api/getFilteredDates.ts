import { QueryFunctionContext } from "@tanstack/react-query";
import { SERVER_URL } from "../../../utils/constants";
import checkStatus from "../../../utils/api/checkStatus";


async function getFilteredDates({ queryKey }: QueryFunctionContext<[string, string]>) {
    const [, movement] = queryKey

    if (movement == "") return null
    console.log(`Getting filtered dates for ${movement}`)

    const response = await fetch(`${SERVER_URL}/filteredhistory/${movement}`, {
        method: "GET",
        credentials: "include"
    });

    return checkStatus(response)
}

export default getFilteredDates