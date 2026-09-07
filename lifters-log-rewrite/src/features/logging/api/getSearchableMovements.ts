import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getSearchableMovements({ queryKey }: QueryFunctionContext<[string, string]>) {
    const [_, criteria] = queryKey

    let response;
    if (criteria === "most" || criteria === "recent") {
        response = await fetch(`${SERVER_URL}/searchableMovements/${criteria}`, {
            method: "GET",
            credentials: "include"
        });
    } else {
        response = await fetch(`${SERVER_URL}/movements`, {
            method: "GET"
        });
    }
    
    if (!response) {
        throw Error("Response undefined")
    }

    const result = await checkStatus(response)

    return result
}

export default getSearchableMovements;