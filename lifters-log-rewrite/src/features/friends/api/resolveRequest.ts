import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type RequestResolution = {
    username: string;
    resolution: string;
}

async function resolveRequest(resolvedRequest: RequestResolution) {
    console.log(resolvedRequest)

    const response = await fetch(`${SERVER_URL}/friend/resolve`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(resolvedRequest)
    });

    return await checkStatus(response);
}

export default resolveRequest;