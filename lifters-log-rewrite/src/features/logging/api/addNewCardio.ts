import CardioSet from "../../../types/CardioSet";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants"

async function addNewCardio(newCardioSet: CardioSet) {
    const response = await fetch(`${SERVER_URL}/log/cardio`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newCardioSet)
    });

    return await checkStatus(response);
}

export default addNewCardio