import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

type NewExercise = {
    exerciseName: string;
    muscleGroup: string;
    isSplit: boolean;
    isBodyweight: boolean;
    description: string;
}

async function createNewExercise(newExercise: NewExercise) {
    const response = await fetch(`${SERVER_URL}/log/newexercise`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newExercise)
    });
    
    return await checkStatus(response);
}

export default createNewExercise