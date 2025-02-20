import { useState } from "react";
import DeleteButton from "../../../components/DeleteButton";

type HistoryRowProps = {
    time: string;
    movement: string;
    weight: number;
    reps: number;
    setid: number;
    split?: boolean;
}


function HistoryRow({ time, movement, weight, reps, setid, split}: HistoryRowProps) {

    const [hovering, setHovering] = useState(false)
    
    function handleDelete() {

    }

    return (
        <div className="historyRow" onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
            <DeleteButton show={hovering} onDelete={handleDelete} />
            <li id={setid.toString()}>
                <div className="historyMovement">{movement}</div>
                [{time}] {weight}lbs x {reps} reps
            </li>
        </div>
    )
}

export default HistoryRow;