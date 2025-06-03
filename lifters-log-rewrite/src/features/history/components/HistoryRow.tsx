import DeleteButton from "../../../components/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeSet from "../api/removeSet";
import TimeSubtext from "../../../components/TimeSubtext";
import useHoverTouch from "../../../hooks/useHoverTouch";
import useLongPress from "../../../hooks/useLongPress";
import { isDesktop } from "react-device-detect";
import { useState } from "react";
import ConfirmationBox from "../../../components/ConfirmationBox";
import { useMovement } from "../../logging/contexts/MovementContextProvider";

type HistoryRowProps = {
    time: string;
    weight: number;
    reps: number;
    setid: number;
    subWeight?: number;
    subReps?: number;
}


function HistoryRow({ time, weight, reps, setid, subReps, subWeight}: HistoryRowProps) {

    const {
        setReps,
        setWeight,
        setSubReps,
        setSubWeight
    } = useMovement();

    const { isHovering, hoverHandlers } = useHoverTouch();
    const { isHeld, holdHandlers } = useLongPress(() => setShowDelete(true));
    const [showDelete, setShowDelete] = useState(false);

    const handlers = isDesktop ? hoverHandlers : holdHandlers;

    const queryClient = useQueryClient();
    
    const removeMutation = useMutation({
        mutationFn: removeSet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["history"], exact: false });
        }
    })
    
    function handleClick() {
        setWeight(weight)
        setReps(reps)
        if (subReps) setSubReps(subReps)
        if (subWeight) setSubWeight(subWeight)
    }

    function handleDelete() {
        removeMutation.mutate(setid);
    }

    return (
        <li id={setid.toString()} className="historyItem" {...handlers} onClick={handleClick}>
            <TimeSubtext className="historyItemTime">{time}</TimeSubtext>
            {
                subWeight && subReps ?
                    <>
                        L: {weight}lbs x {reps} reps 
                        <br/>
                        R: {subWeight}lbs x {subReps} reps
                    </>
                :
                    `${weight}lbs x ${reps} reps`
            }
            {
                isDesktop ?
                    <DeleteButton show={isHovering} onDelete={handleDelete} />
                :
                    showDelete && 
                        <ConfirmationBox 
                            confirmFn={handleDelete} 
                            cancelFn={() => setShowDelete(false)}
                            text="Delete this set?"
                            className="historyOffset"
                        />
            }
        </li>
    )
}

export default HistoryRow;