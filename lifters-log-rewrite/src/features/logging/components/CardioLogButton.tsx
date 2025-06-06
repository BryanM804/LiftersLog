import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SyntheticEvent, useState } from "react";
import addNewCardio from "../api/addNewCardio";
import { XPPARTICLE_DIVISOR } from "../../../utils/constants";
import { useDate } from "../../history/contexts/DateContextProvider";

type CardioLogButtonProps = {
    movement: string;
    time: number;
    distance: number;
    note: string;
    onLogSuccess: (xpParticleMultiplier: number) => void;
}

function CardioLogButton({ movement, time, distance, note, onLogSuccess }: CardioLogButtonProps) {

    const queryClient = useQueryClient();
    const { historyDate } = useDate()

    const [invalidLog, setInvalidLog] = useState(false);

    const cardioMutation = useMutation({
        mutationFn: addNewCardio,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["history", "cardio"] })

            let xpNumber = time * 100
            if (xpNumber < 500)
                xpNumber = 500
            onLogSuccess(xpNumber / XPPARTICLE_DIVISOR)
        }
    })

    function handleClick(e: SyntheticEvent) {
        e.preventDefault();
        if (movement.length > 0 && time > 0 && distance >= 0) {
            cardioMutation.mutate({ movement, cardiotime: time, distance, note, date: historyDate.toDateString() });
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