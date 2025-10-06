import { ChangeEvent, SyntheticEvent } from "react";
import { useMovement } from "../contexts/MovementContextProvider";
import { useQuery } from "@tanstack/react-query";
import getMovements from "../api/getMovements";
import ServerError from "../../../components/ServerError";
import { isMobile } from "react-device-detect";

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

function MovementPicker({ onClear, label, className, clearButtonClassName, placeholder }: MovementPickerProps) {

    const { movement, setMovement } = useMovement();

    // Stale time is infinity because they will refetch on element reload anyway and there will rarely ever be a new movement
    const { data: movements, error, isLoading } = useQuery({
        queryKey: ["movements"],
        queryFn: getMovements,
        staleTime: Infinity
    });

    function handleMovementChange(e: ChangeEvent<HTMLInputElement>) {
        setMovement(e.target.value);
    }
    
    function clearText(e: SyntheticEvent) {
        // Not sure why you need to prevent default on a plain button
        e.preventDefault();
        setMovement("")
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
                />
                {
                    isMobile && 
                    <button 
                        className={`smallFloatingButton transparentButton clearMovementButton ${clearButtonClassName && clearButtonClassName}`}
                        type="button"
                        onClick={clearText}
                        style={{fontWeight: "bold", fontSize: "1rem"}}
                        >
                            X
                        </button>
                }
            </div>
        </>
    )
}

export default MovementPicker;