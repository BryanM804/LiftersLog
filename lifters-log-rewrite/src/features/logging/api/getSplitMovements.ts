import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getSplitMovements() {
    const response = await fetch(`${SERVER_URL}/movements/split`, {
        method: "GET"
    });
    
    return await checkStatus(response);
}

export default getSplitMovements;