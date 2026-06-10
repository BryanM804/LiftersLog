import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getMovements() {
    const response = await fetch(`${SERVER_URL}/movements`, {
        method: "GET"
    });

    const result = await checkStatus(response)

    return result
}

export default getMovements;