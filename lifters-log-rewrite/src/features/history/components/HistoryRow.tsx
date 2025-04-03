import DeleteButton from "../../../components/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeSet from "../api/removeSet";
import TimeSubtext from "../../../components/TimeSubtext";
import useHoverTouch from "../../../app/hooks/useHoverTouch";
import useLongPress from "../../../app/hooks/useLongPress";
import { isDesktop, isMobile } from "react-device-detect";
import { useState } from "react";
import ConfirmationBox from "../../../components/ConfirmationBox";

type HistoryRowProps = {
    time: string;
    weight: number;
    reps: number;
    setid: number;
    split?: boolean;
}


function HistoryRow({ time, weight, reps, setid, split}: HistoryRowProps) {

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
    
    function handleDelete() {
        removeMutation.mutate(setid);
    }

    return (
        <li id={setid.toString()} className="historyItem" {...handlers}>
            <TimeSubtext className="historyItemTime">{time}</TimeSubtext> {weight}lbs x {reps} reps
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