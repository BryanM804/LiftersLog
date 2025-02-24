import { useQuery } from "@tanstack/react-query";
import HistoryGroup from "./HistoryGroup";
import getHistoryGroupsForDate from "../api/getHistoryGroupsForDate";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";

type HistoryListProps = {
    date: string;
    className?: string;
    placeholder: string;
}

type HistoryGroup = {
    movement: string;
}

function HistoryList({ date, className, placeholder }: HistoryListProps) {

    const {data, error, isLoading} = useQuery({
        queryKey: ["history",  date],
        queryFn: () => getHistoryGroupsForDate(date)
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <div className={className}>
            {
                (data != null && data.length > 0) ? 
                data.map((historyGroup: HistoryGroup) => 
                    <HistoryGroup movement={historyGroup.movement} date={date} key={historyGroup.movement}/>
                )
                :
                <div className="darkFont">{placeholder}</div>
            }
        </div>
    )
}

export default HistoryList