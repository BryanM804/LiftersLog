import { QueryFunctionContext } from "@tanstack/react-query";
import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";


async function getFriendList({ queryKey }: QueryFunctionContext<[string, boolean]>) {
    const [, requests] = queryKey

    const url = `${SERVER_URL}/${ requests ? "requests" : "friends"}`

    const response = await fetch(url ,{
        method: "GET",
        credentials: "include"
    });

    return await checkStatus(response);
}

export default getFriendList;