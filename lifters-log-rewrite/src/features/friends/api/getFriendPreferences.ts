import { QueryFunctionContext } from "@tanstack/react-query"
import { SERVER_URL } from "../../../utils/constants"
import checkStatus from "../../../utils/api/checkStatus"


async function getFriendPreferences({ queryKey }: QueryFunctionContext<[string, string]>) {
    const [, username] = queryKey

    const response = await fetch(`${SERVER_URL}/friendpreferences/${username}`, {
        method: "GET",
        credentials: "include"
    })

    return checkStatus(response)
}

export default getFriendPreferences