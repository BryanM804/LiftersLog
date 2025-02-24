import { SERVER_URL } from "../../../utils/constants";

async function getNotesForMovement(movement: string) {
    if (movement === "") {
        return null;
    }

    const response = await fetch(`${SERVER_URL}/note/${movement}/${new Date().toDateString()}/true`, {
        method: "GET",
        credentials: "include"
    });

    return response.json();
}

export default getNotesForMovement