import { ChangeEvent } from "react";
import { useMovement } from "../contexts/MovementContextProvider";
import { useQuery } from "@tanstack/react-query";
import getMovements from "../api/getMovements";
import ServerError from "../../../components/ServerError";
import useDoublePress from "../../../hooks/useDoublePress";

type MovementPickerProps = {
    onClear?: VoidFunction;
    label?: string;
    className?: string;
    clearButtonClassName?: string;
    placeholder?: string;
}

type Movement = { 
    movement: string;
    exerciseid: number;
}

function MovementPicker({ onClear, label, className, placeholder }: MovementPickerProps) {

    const { movement, setMovement, setExerciseId } = useMovement();

    const { doublePressHandlers } = useDoublePress(clearText)

    const { data: movements, error, isLoading } = useQuery({
        queryKey: ["movements"],
        queryFn: getMovements
    });

    function handleMovementChange(e: ChangeEvent<HTMLInputElement>) {
        setMovement(e.target.value);
        
        const selectedExercise = movements.find((ex: {movement: string; exerciseid: number}) => ex.movement.toLowerCase() === e.target.value.toLowerCase())
        
        if (selectedExercise) {
            setExerciseId(selectedExercise.exerciseid)
        } else {
            setExerciseId(-1)
        }
    }
    
    function clearText() {
        setMovement("")
        setExerciseId(-1)
        if (onClear) onClear();
    }

    if (error) return <ServerError />

    return (
        <>
            <datalist id="movementList">
                { isLoading ?
                    <option value={"Loading..."} />
                    :
                    movements.map((movement: Movement) => 
                        <option value={movement.movement} key={movement.exerciseid}/>
                    )
                }
            </datalist>
            { label && 
                <>
                    <label htmlFor="movement">{label}</label>
                </> 
            }
            <div style={{position: "relative", width: "100%"}} >
                <input 
                    type="text" 
                    className={`longTextInput movementPicker ${className && className}`}
                    id="movement" 
                    autoComplete="on" 
                    list="movementList" 
                    onChange={handleMovementChange} 
                    value={movement}
                    placeholder={placeholder && placeholder} 
                    {...doublePressHandlers}
                />
            </div>
        </>
    )
}

export default MovementPicker;