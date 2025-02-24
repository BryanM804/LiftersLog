import { SERVER_URL } from "../../../utils/constants";


async function getSplitMovements() {
    const response = await fetch(`${SERVER_URL}/movements/split`, {
        method: "GET"
    });
    return response.json();
}

export default getSplitMovements;