import { SyntheticEvent } from "react";
import { useMovement } from "../contexts/MovementContextProvider";

type LogButtonProps = {
    reps: number;
    subReps?: number;
    weight: number;
    subWeight?: number;
}

function LogButton({ reps, subReps, weight, subWeight }: LogButtonProps) {

    const { movement } = useMovement();

    function handleLogSubmit(e: SyntheticEvent) {
        e.preventDefault();

        if (movement === "") return;

        console.log(`${movement}: ${reps} x ${weight}lbs`)
        console.log(`Subreps: ${subReps}, subweight: ${subWeight}`)
        // Submit set to database
    }

    return (
        <div style={{textAlign: "center"}} className="gridItemSpan">
            <input type="submit" className="floatingButton" onClick={handleLogSubmit} value="Log" />
        </div>
    )
}

export default LogButton;