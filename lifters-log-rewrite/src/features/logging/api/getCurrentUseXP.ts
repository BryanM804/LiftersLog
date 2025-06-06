import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getCurrentUserXP() {
    const response = await fetch(`${SERVER_URL}/userxp`, {
        method: "GET",
        credentials: "include"
    })

    return checkStatus(response)
}

export default getCurrentUserXP