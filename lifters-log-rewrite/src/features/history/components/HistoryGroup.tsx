import { useQuery } from "@tanstack/react-query";
import getHistoryForDate from "../api/getHistoryForDate";
import HistoryItem from "../types/HistoryItem";
import HistoryRow from "./HistoryRow";
import ServerError from "../../../components/ServerError";
import Loading from "../../../components/Loading";
import ItemNotes from "./ItemNotes";


type HistoryGroupProps = {
    date: string;
    movement: string;
    onClick?: () => void;
}

function HistoryGroup({ date, movement, onClick }: HistoryGroupProps) {
    
    const { data, error, isLoading } = useQuery({
        queryKey: ["history", "group", {date, movement}],
        queryFn: () => getHistoryForDate(date, movement)
    });

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <div className="historyGroup" onClick={onClick}>
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
                            reps={historyItem.reps}
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