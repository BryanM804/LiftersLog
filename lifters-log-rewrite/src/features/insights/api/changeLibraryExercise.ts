import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type ExerciseChange = {
    exerciseid: number;
    changeType: string;
}

async function changeLibraryExercise(changedExercise: ExerciseChange) {
    const type = changedExercise.changeType
    const validTypes = ["add", "remove", "delete"]
    if (!validTypes.includes(type)) throw new Error("Invalid exercise change type: " + type)

    const response = await fetch(`${SERVER_URL}/exercise/${type}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({exerciseid: changedExercise.exerciseid})
    });

    return await checkStatus(response)
}

export default changeLibraryExercise;