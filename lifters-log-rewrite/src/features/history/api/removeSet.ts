import { SERVER_URL } from "../../../utils/constants";


async function removeSet(setid: number) {
    const response = await fetch(`${SERVER_URL}/log`, {
        method: "DELETE",
        headers: {"Content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify({setid: setid})
    });
    return response.json();
}

export default removeSet;