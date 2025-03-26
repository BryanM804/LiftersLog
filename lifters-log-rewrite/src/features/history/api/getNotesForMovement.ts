import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getNotesForMovement(movement: string, date: string) {
    const response = await fetch(`${SERVER_URL}/note/${movement}/${date}/false`, {
        method: "GET",
        credentials: "include"
    });
    
    return checkStatus(response);
}

export default getNotesForMovement