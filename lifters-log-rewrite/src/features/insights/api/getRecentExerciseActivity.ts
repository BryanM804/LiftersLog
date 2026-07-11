import { QueryFunctionContext } from "@tanstack/react-query";
import { SERVER_URL } from "../../../utils/constants";
import checkStatus from "../../../utils/api/checkStatus";


async function getRecentExerciseActivity({ queryKey }: QueryFunctionContext<[string, number]>) {
    const [, exerciseid] = queryKey

    const response = await fetch(`${SERVER_URL}/recentExerciseActivity/${exerciseid}`, {
        method: "GET",
        credentials: "include"
    });

    const responseStatus = await checkStatus(response)

    console.log(responseStatus)

    return responseStatus
}

export default getRecentExerciseActivity