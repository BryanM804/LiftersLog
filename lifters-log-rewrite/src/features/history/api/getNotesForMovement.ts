import { SERVER_URL } from "../../../utils/constants";


async function getNotesForMovement(movement: string, date: string) {
    const response = await fetch(`${SERVER_URL}/note/${movement}/${date}/false`, {
        method: "GET",
        credentials: "include"
    });
    return response.json();
}

export default getNotesForMovement