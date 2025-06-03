import { useQuery } from "@tanstack/react-query";
import getHistoryForDate from "../api/getHistoryForDate";
import HistoryItem from "../types/HistoryItem";
import HistoryRow from "./HistoryRow";
import ServerError from "../../../components/ServerError";
import Loading from "../../../components/Loading";
import ItemNotes from "./ItemNotes";
import { useMovement } from "../../logging/contexts/MovementContextProvider";


type HistoryGroupProps = {
    date: string;
    movement: string;
    onClick?: () => void;
}

function HistoryGroup({ date, movement, onClick }: HistoryGroupProps) {

    const { setMovement } = useMovement()
    
    const { data, error, isLoading } = useQuery({
        queryKey: ["history", "group", date, movement],
        queryFn: getHistoryForDate
    });

    function handleClick() {
        setMovement(movement)
        onClick?.()
    }

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <div className="historyGroup" onClick={handleClick}>
            <div className="historyTitle">
                {movement}
            </div>
            <hr />
            <ul className="historySubList">
                {
                    data.map((historyItem: HistoryItem) => 
                        <HistoryRow
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
            <ItemNotes movement={movement} date={date} />
        </div>
    )
}

export default HistoryGroup