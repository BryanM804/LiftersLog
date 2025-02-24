import { SERVER_URL } from "../../../utils/constants";

async function getLabelForDate(date: string) {
    const response = await fetch(`${SERVER_URL}/label/${date}`, {
        method: "GET",
        credentials: "include"
    });
    return response.json();
}

export default getLabelForDate;