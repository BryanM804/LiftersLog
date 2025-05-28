import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function removeCardioSet(cardioid: number) {
    const response = await fetch(`${SERVER_URL}/log/cardio`, {
        method: "DELETE",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({cardioid})
    });

    return checkStatus(response);
}

export default removeCardioSet;