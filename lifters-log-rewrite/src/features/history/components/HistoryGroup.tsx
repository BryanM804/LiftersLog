import { useQuery } from "@tanstack/react-query";
import getHistoryForDate from "../api/getHistoryForDate";
import HistoryItem from "../types/HistoryItem";
import HistoryRow from "./HistoryRow";
import ServerError from "../../../components/ServerError";
import Loading from "../../../components/Loading";
import ItemNotes from "./ItemNotes";
import { useMovement } from "../../logging/contexts/MovementContextProvider";
import { useDate } from "../contexts/DateContextProvider";


type HistoryGroupProps = {
    movement: string;
    onClick?: () => void;
}

function HistoryGroup({ movement, onClick }: HistoryGroupProps) {

    const { 
        setMovement,
        setWeight,
        setSubWeight,
        setReps,
        setSubReps
    } = useMovement()
    const { historyDate } = useDate()
    
    const { data, error, isLoading } = useQuery({
        queryKey: ["history", "group", historyDate.toDateString(), movement],
        queryFn: getHistoryForDate
    });

    function handleClick() {
        setMovement(movement)
        setWeight(0)
        setSubWeight(0)
        setReps(0)
        setSubReps(0)
        onClick?.()
    }

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <div className="historyGroup">
            <div className="historyTitle" onClick={handleClick}>
                {movement}
            </div>
            <hr />
            <ul className="historySubList">
                {
                    data.map((historyItem: HistoryItem) => 
                        // Even though the rows are all under a group, they need to know their movement
                        // so they can set the input boxes
                        <HistoryRow
                            movement={historyItem.movement}
                            time={historyItem.time}
                            weight={historyItem.weight}
                            subWeight={historyItem.subweight}
                            reps={historyItem.reps}
                            subReps={historyItem.subreps}
                            key={historyItem.setid}
                            setid={historyItem.setid}
                        />
                    )
                }
            </ul>
            <ItemNotes movement={movement} />
        </div>
    )
}

export default HistoryGroup