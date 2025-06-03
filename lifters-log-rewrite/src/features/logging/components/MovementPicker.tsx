import { ChangeEvent, SyntheticEvent, useEffect } from "react";
import { useMovement } from "../contexts/MovementContextProvider";
import { useQuery } from "@tanstack/react-query";
import getMovements from "../api/getMovements";
import ServerError from "../../../components/ServerError";
import { isMobile } from "react-device-detect";

type MovementPickerProps = {
    onClear?: VoidFunction;
    label?: string;
    className?: string;
    placeholder?: string;
}

type Movement = { 
    movement: string;
    exerciseid: number;
}

function MovementPicker({ onClear, label, className, placeholder }: MovementPickerProps) {

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
                    <br />
                </> 
            }
            <div style={{position: "relative"}} className={className && className}>
                <input 
                    type="text" 
                    className="longTextInput movementPicker"
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
                        className="smallFloatingButton transparentButton clearMovementButton" 
                        onClick={clearText}
                        >
                            ❌
                        </button>
                }
            </div>
        </>
    )
}

export default MovementPicker;