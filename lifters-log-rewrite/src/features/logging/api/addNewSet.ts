import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type NewSet = {
    movement: string;
    weight: number;
    reps: number;
    subreps?: number;
    subweight?: number;
    date: string;
}

async function addNewSet(newSet: NewSet) {
    const response = await fetch(`${SERVER_URL}/log`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newSet)
    });
    
    return await checkStatus(response);
}

export default addNewSet;