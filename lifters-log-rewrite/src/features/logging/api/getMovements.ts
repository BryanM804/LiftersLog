import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getMovements() {
    const response = await fetch(`${SERVER_URL}/movements`, {
        method: "GET"
    });
    
    return await checkStatus(response);
}

export default getMovements;