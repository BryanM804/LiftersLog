import checkStatus from "../../../utils/api/checkStatus"
import { SERVER_URL } from "../../../utils/constants"


async function unfriendUser(username: string) {
    const response = await fetch(`${SERVER_URL}/removefriend`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username: username })
    })

    return checkStatus(response)
}

export default unfriendUser