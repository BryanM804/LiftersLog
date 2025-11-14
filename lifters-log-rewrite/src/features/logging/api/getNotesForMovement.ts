import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getNotesForMovement({ queryKey }: QueryFunctionContext<[string, string, string]>) {
    const [, movement, activeDate] = queryKey

    if (movement === "") {
        return null;
    }

    const response = await fetch(`${SERVER_URL}/note/${movement}/${activeDate}/true`, {
        method: "GET",
        credentials: "include"
    });

    return await checkStatus(response);
}

export default getNotesForMovement