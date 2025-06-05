import { useQuery } from "@tanstack/react-query";
import HistoryGroup from "./HistoryGroup";
import getHistoryGroupsForDate from "../api/getHistoryGroupsForDate";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import CardioList from "./CardioList";
import { useState } from "react";
import { useDate } from "../contexts/DateContextProvider";
import ToggleSwitch from "../../../components/ToggleSwitch";

type HistoryListProps = {
    className?: string;
    placeholder: string;
    placeholderClass?: string;
}

type HistoryGroup = {
    movement: string;
}

function HistoryList({ className, placeholder, placeholderClass }: HistoryListProps) {

    const { historyDate } = useDate()

    const [placeholderText, setPlaceholderText] = useState(placeholder)

    const {data, error, isLoading} = useQuery({
        queryKey: ["history",  historyDate.toDateString()],
        queryFn: getHistoryGroupsForDate
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <ul className={className}>
            {
                (data != null && data.length > 0) ? 
                data.map((historyGroup: HistoryGroup) => 
                    <HistoryGroup movement={historyGroup.movement} key={historyGroup.movement} />
                )
                :
                <li className={"darkFont "+placeholderClass} style={{padding: "0.5rem"}}>{placeholderText}</li>
            }
            <CardioList setPlaceholderText={setPlaceholderText}/>
        </ul>
    )
}

export default HistoryList