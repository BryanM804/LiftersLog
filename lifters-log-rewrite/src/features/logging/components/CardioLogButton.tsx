import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SyntheticEvent, useState } from "react";
import addNewCardio from "../api/addNewCardio";

type CardioLogButtonProps = {
    movement: string;
    time: number;
    distance: number;
    note: string;
    onLogSuccess: () => void;
}

function CardioLogButton({ movement, time, distance, note, onLogSuccess }: CardioLogButtonProps) {

    const queryClient = useQueryClient();

    const [invalidLog, setInvalidLog] = useState(false);

    const cardioMutation = useMutation({
        mutationFn: addNewCardio,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["history", "cardio"] })
            onLogSuccess()
        }
    })

    function handleClick(e: SyntheticEvent) {
        e.preventDefault();
        if (movement.length > 0 && time > 0 && distance >= 0) {
            cardioMutation.mutate({ movement, cardiotime: time, distance, note });
        } else {
            setInvalidLog(true);
            setTimeout(() => {
                setInvalidLog(false)
            }, 200)
        }
    }

    return (
        <div className="gridItemSpan">
            <button 
                className={invalidLog ? "floatingButton redButton" : "floatingButton"}
                onClick={handleClick}
                style={{width: "75%"}}
                id="logButton"
            >
            Log
            </button>
        </div>
    )
}

export default CardioLogButton