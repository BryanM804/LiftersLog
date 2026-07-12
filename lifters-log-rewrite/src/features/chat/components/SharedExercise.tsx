import { useState } from "react";
import ExerciseCard from "../../insights/components/ExerciseCard";

type SharedExerciseProps = {
    shareCode: string;
}

function SharedExercise({ shareCode }: SharedExerciseProps) {
    const codeComponents = shareCode.split("#-#")
    const exerciseid = codeComponents[0].substring(6)
    const movement = codeComponents[1].substring(0, codeComponents[1].length - 2)

    // console.log(`Parsed info from ${shareCode}, exerciseid: ${exerciseid}, movement: ${movement}`)

    const [showingExerciseCard, setShowingExerciseCard] = useState(false)

    return (
        <>
            {
                showingExerciseCard &&
                <ExerciseCard exerciseid={parseInt(exerciseid)} movement={movement} onCancel={() => setShowingExerciseCard(false)}/>
            }
            <span
                style={{
                    backgroundColor: "rgb(80, 130, 80)",
                    borderRadius: "12px",
                    padding: "0.2rem",
                    margin: "0.15rem"
                }}
                onClick={() => setShowingExerciseCard(true)}
            >
                {movement}
            </span>
        </>
    )
}

export default SharedExercise;