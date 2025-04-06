import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants"

type NewCardio = {
    movement: string;
    time: number;
    distance: number;
    note: string;
}

async function addNewCardio(newCardioSet: NewCardio) {
    const response = await fetch(`${SERVER_URL}/log/cardio`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newCardioSet)
    });

    return checkStatus(response);
}

export default addNewCardio