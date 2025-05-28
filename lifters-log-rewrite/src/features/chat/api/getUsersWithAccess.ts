import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getUsersWithAccess({ queryKey }: QueryFunctionContext<[string, number]>) {
    const [, roomid] = queryKey

    const response = await fetch(`${SERVER_URL}/chat/users/${roomid}`, {
        method: "GET",
        credentials: "include"
    });

    return checkStatus(response, "Unable to get users with chat access.");
}

export default getUsersWithAccess;