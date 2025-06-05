import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function getUserRecords({ queryKey }: QueryFunctionContext<[string, string?]>) {
    const [, username] = queryKey;

    const response = await fetch(`${SERVER_URL}/records${ username ? `/${username}` : ""}`, {
        method: "GET",
        credentials: "include"
    });

    return await checkStatus(response);
}

export default getUserRecords;