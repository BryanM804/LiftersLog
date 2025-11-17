import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type EditedNote = {
    noteid: number;
    text: string;
    sticky: boolean;
}

async function editNote(newNote: EditedNote) {
    const response = await fetch(`${SERVER_URL}/editNote`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newNote)
    });

    return await checkStatus(response);
}

export default editNote;