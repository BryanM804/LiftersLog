import { SyntheticEvent, useState } from "react";
import { useMovement } from "../contexts/MovementContextProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addNewSet from "../api/addNewSet";

type LogButtonProps = {
    reps: number;
    subReps?: number;
    weight: number;
    subWeight?: number;
}

function LogButton({ reps, subReps, weight, subWeight }: LogButtonProps) {

    const { movement } = useMovement();
    const [invalidLog, setInvalidLog] = useState(false);

    const queryClient = useQueryClient();

    const setMutation = useMutation({
        mutationFn: addNewSet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["history"], exact: false });
            // Add some kind of confirmation animation later
        }
    });

    function handleLogSubmit(e: SyntheticEvent) {
        e.preventDefault();

        if (reps <= 0 || weight <= 0 || reps > 100 || weight > 1500 || movement === "") {
            setInvalidLog(true);
            setTimeout(() => {
                setInvalidLog(false);
            }, 100);
            return;
        }

        console.log(`${movement}: ${reps} x ${weight}lbs`)
        console.log(`Subreps: ${subReps}, subweight: ${subWeight}`)
        setMutation.mutate({movement: movement, weight: weight, reps: reps, subweight: subWeight, subreps: subReps});
    }

    return (
        <div style={{textAlign: "center"}} className="gridItemSpan">
            <input type="submit" className={invalidLog ? "floatingButton redButton" : "floatingButton"} onClick={handleLogSubmit} value="Log" style={{width: "75%"}}/>
        </div>
    )
}

export default LogButton;