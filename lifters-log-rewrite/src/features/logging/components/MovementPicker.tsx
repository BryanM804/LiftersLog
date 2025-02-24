import { ChangeEvent, SyntheticEvent } from "react";
import { useMovement } from "../contexts/MovementContextProvider";
import { useQuery } from "@tanstack/react-query";
import getMovements from "../api/getMovements";
import getSplitMovements from "../api/getSplitMovements";

type MovementPickerProps = {
    changeSplit: (newBool: boolean) => void;
    onClear: VoidFunction;
}

type Movement = { 
    movement: string;
    exerciseid: number;
}

function MovementPicker({ changeSplit, onClear }: MovementPickerProps) {

    const { movement, setMovement } = useMovement();

    // Stale time is infinity because they will refetch on element reload anyway and there will rarely ever be a new movement
    const { data: movements, error, isLoading } = useQuery({
        queryKey: ["movements"],
        queryFn: getMovements,
        staleTime: Infinity
    });

    const { data: splitMovements, error: splitError, isLoading: isSplitLoading } = useQuery({
        queryKey: ["splitMovements"],
        queryFn: getSplitMovements,
        staleTime: Infinity
    });

    function isSplittableMovement(m: string) {
        for (const s of splitMovements) {
            if (s.movement == m)
                return true;
        }
        return false;
    }

    function handleMovementChange(e: ChangeEvent<HTMLInputElement>) {
        setMovement(e.target.value);
        if (isSplittableMovement(e.target.value)) {
            changeSplit(true)
        } else {
            changeSplit(false)
        }
    }
    
    function clearText(e: SyntheticEvent) {
        // Not sure why you need to prevent default on a plain button
        e.preventDefault();
        setMovement("")
        changeSplit(false)
        onClear();
    }

    if (error || splitError) {
        return (
            <>Server error occured</>
        )
    }

    return (
        <>
            <datalist id="movementList">
                { (isLoading || isSplitLoading) ?
                    <option value={"Loading..."} />
                    :
                    movements.map((movement: Movement) => 
                        <option value={movement.movement} key={movement.exerciseid}/>
                    )
                }
            </datalist>
            <label htmlFor="movement">Exercise</label>
            <br />
            <input type="text" className="longTextInput" id="movement" autoComplete="on" list="movementList" onChange={handleMovementChange} value={movement} />
            <button className="smallFloatingButton" onClick={clearText}>❌</button>
        </>
    )
}

export default MovementPicker;