import { useState } from "react";
import DeleteButton from "../../../components/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeSet from "../api/removeSet";

type HistoryRowProps = {
    time: string;
    weight: number;
    reps: number;
    setid: number;
    split?: boolean;
}


function HistoryRow({ time, weight, reps, setid, split}: HistoryRowProps) {

    const [hovering, setHovering] = useState(false);

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
        <li id={setid.toString()} className="historyItem" onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
            [{time}] {weight}lbs x {reps} reps
            <DeleteButton show={hovering} onDelete={handleDelete} />
        </li>
    )
}

export default HistoryRow;