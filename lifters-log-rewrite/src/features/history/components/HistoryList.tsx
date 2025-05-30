import { useQuery } from "@tanstack/react-query";
import HistoryGroup from "./HistoryGroup";
import getHistoryGroupsForDate from "../api/getHistoryGroupsForDate";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import CardioList from "./CardioList";

type HistoryListProps = {
    date: string;
    className?: string;
    placeholder: string;
    placeholderClass?: string;
    movementChange?: (s: string) => void;
}

type HistoryGroup = {
    movement: string;
}

function HistoryList({ date, className, placeholder, placeholderClass, movementChange }: HistoryListProps) {

    const {data, error, isLoading} = useQuery({
        queryKey: ["history",  date],
        queryFn: getHistoryGroupsForDate
    })

    function handleMovementChange(m: string) {
        if (movementChange) {
            movementChange(m)
        }
    }

    // if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <ul className={className}>
            {
                (data != null && data.length > 0) ? 
                data.map((historyGroup: HistoryGroup) => 
                    <HistoryGroup movement={historyGroup.movement} date={date} key={historyGroup.movement} onClick={() => handleMovementChange(historyGroup.movement)}/>
                )
                :
                <div className={"darkFont "+placeholderClass} style={{padding: "0.5rem"}}>{placeholder}</div>
            }
            <CardioList date={date} />
        </ul>
    )
}

export default HistoryList