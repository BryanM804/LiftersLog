import { forwardRef, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { useMovement } from "../contexts/MovementContextProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addNewSet from "../api/addNewSet";
import { useDate } from "../../history/contexts/DateContextProvider";

type LogButtonProps = {
    isSplit: boolean;
    onLogSuccess: () => void;
}

// const LogButton = forwardRef<HTMLInputElement, LogButtonProps>(({ isSplit, onLogSuccess }, ref) => {
function LogButton({ isSplit, onLogSuccess }: LogButtonProps) {
    const { 
        movement,
        reps,
        subReps,
        weight,
        subWeight
    } = useMovement();
    const { historyDate } = useDate()

    const [invalidLog, setInvalidLog] = useState(false);

    const queryClient = useQueryClient();

    const setMutation = useMutation({
        mutationFn: addNewSet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["history"], exact: false });
            // Add some kind of confirmation animation later
            onLogSuccess()
        }
    });

    function handleLogSubmit(e: SyntheticEvent) {
        e.preventDefault();

        if (reps <= 0 || weight <= 0 || reps > 100 || weight > 1500 || movement === "" || (isSplit && (subReps <= 0 || subWeight <= 0))) {
            setInvalidLog(true);
            setTimeout(() => {
                setInvalidLog(false);
            }, 200);
            return;
        }

        setMutation.mutate({movement: movement, weight: weight, reps: reps, subweight: subWeight, subreps: subReps, date: historyDate.toDateString()});
    }

    return (
        <div style={{textAlign: "center"}} className="gridItemSpan">
            <input 
                type="submit" 
                className={invalidLog ? "floatingButton redButton" : "floatingButton"} 
                onClick={handleLogSubmit} 
                value="Log" 
                style={{width: "75%", zIndex: 1, position: "relative"}}
                id="logButton"
            />
        </div>
    )
}

export default LogButton;