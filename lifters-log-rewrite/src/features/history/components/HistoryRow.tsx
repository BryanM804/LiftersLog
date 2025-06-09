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
    movement: string;
    time: string;
    weight: number;
    reps: number;
    setid: number;
    subWeight?: number;
    subReps?: number;
}


function HistoryRow({ movement, time, weight, reps, setid, subReps, subWeight}: HistoryRowProps) {

    const {
        setMovement,
        setReps,
        setWeight,
        setSubReps,
        setSubWeight
    } = useMovement();

    const { isHovering, hoverHandlers } = useHoverTouch();
    const { holdHandlers } = useLongPress(() => setShowDelete(true));
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
        setMovement(movement)
        setWeight(weight)
        setReps(reps)
        setSubReps(subReps ? subReps : 0)
        setSubWeight(subWeight ? subWeight : 0)
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