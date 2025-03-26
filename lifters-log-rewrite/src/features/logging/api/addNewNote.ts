import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type NewNote = {
    movement: string;
    text: string;
    sticky: boolean;
}

async function addNewNote(newNote: NewNote) {
    const response = await fetch(`${SERVER_URL}/note`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newNote)
    });

    return checkStatus(response);
}

export default addNewNote;