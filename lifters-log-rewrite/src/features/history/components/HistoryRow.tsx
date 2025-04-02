import DeleteButton from "../../../components/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeSet from "../api/removeSet";
import TimeSubtext from "../../../components/TimeSubtext";
import useHoverTouch from "../../../app/hooks/useHoverTouch";

type HistoryRowProps = {
    time: string;
    weight: number;
    reps: number;
    setid: number;
    split?: boolean;
}


function HistoryRow({ time, weight, reps, setid, split}: HistoryRowProps) {

    const { isHovering, hoverHandlers } = useHoverTouch();

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
        <li id={setid.toString()} className="historyItem" {...hoverHandlers}>
            <TimeSubtext className="historyItemTime">{time}</TimeSubtext> {weight}lbs x {reps} reps
            <DeleteButton show={isHovering} onDelete={handleDelete} />
        </li>
    )
}

export default HistoryRow;