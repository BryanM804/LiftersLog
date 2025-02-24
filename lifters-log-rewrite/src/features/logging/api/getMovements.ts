import { SERVER_URL } from "../../../utils/constants";


async function getMovements() {
    const response = await fetch(`${SERVER_URL}/movements`, {
        method: "GET"
    });
    return response.json();
}

export default getMovements;