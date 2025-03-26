import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type NewLabel = {
    label: string;
    date: string;
}

async function createNewLabel(newLabel: NewLabel) {
    const response = await fetch(`${SERVER_URL}/label/new`, {
        method: "POST", 
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newLabel)
    });

    return checkStatus(response);
}

export default createNewLabel;