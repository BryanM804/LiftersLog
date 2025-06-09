import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants"

async function getBodyweightMovements() {
    const response = await fetch(`${SERVER_URL}/movements/bodyweight`, {
        method: "GET"
    });

    return checkStatus(response);
}

export default getBodyweightMovements