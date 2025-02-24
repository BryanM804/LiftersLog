import { SERVER_URL } from "../../../utils/constants";

async function deleteNote(noteid: number) {
    const response = await fetch(`${SERVER_URL}/note`, {
        method: "DELETE",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ noteid: noteid })
    });

    return response.json();
}

export default deleteNote;