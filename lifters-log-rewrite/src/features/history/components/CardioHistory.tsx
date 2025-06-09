import { useState } from "react";
import useHoverTouch from "../../../hooks/useHoverTouch";
import useLongPress from "../../../hooks/useLongPress";
import { isMobile } from "react-device-detect";
import ConfirmationBox from "../../../components/ConfirmationBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeCardioSet from "../api/removeCardioSet";
import DeleteButton from "../../../components/DeleteButton";

type CardioHistoryProps = {
    movement: string;
    time: number;
    distance: number;
    note: string;
    cardioid?: number;
}

function CardioHistory ({ movement, time, distance, note, cardioid }: CardioHistoryProps) {

    const { isHovering, hoverHandlers } = useHoverTouch();
    const { holdHandlers } = useLongPress(() => setShowDelete(true));
    const [showDelete, setShowDelete] = useState(false);

    const queryClient = useQueryClient();

    const handlers = isMobile ? holdHandlers : hoverHandlers

    const deleteMutation = useMutation({
        mutationFn: removeCardioSet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["history", "cardio"] })
        }
    })

    function confirmDelete() {
        if (cardioid)
            deleteMutation.mutate(cardioid)
        //else
            //show an error
        setShowDelete(false)
    }

    return (
        <div className="historyGroup" {...handlers}>
            <div className="historyTitle">
                {movement}
            </div>
            <hr />
            <ul className="historySubList">
                <li className="cardioItem">
                    {time} minutes {distance > 0 && `, ${distance} miles`}
                    {   
                        !isMobile && <DeleteButton show={isHovering} onDelete={confirmDelete} confirmationMessage="Delete this cardio?"/>
                    }
                    {
                        showDelete && 
                        <ConfirmationBox 
                            confirmFn={confirmDelete} 
                            cancelFn={() => setShowDelete(false)} 
                            text="Delete this cardio?"
                        />
                    }
                </li>
            </ul>
            {
                note.length > 0 &&
                <div>
                <div style={{fontWeight: "bold"}}>Note:</div>
                    <ul className="historyNotes">
                        <li>
                            {note}
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default CardioHistory;