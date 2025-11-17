import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../../hooks/useDebounce";
import { useMovement } from "../contexts/MovementContextProvider";
import getHistoryForDate from "../../history/api/getHistoryForDate";
import { useDate } from "../../history/contexts/DateContextProvider";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import HistoryItem from "../../history/types/HistoryItem";
import HistoryRow from "../../history/components/HistoryRow";

function FocusedSetHistory() {
    const { movement } = useMovement();
    const { historyDate } = useDate();
    const debouncedMovement = useDebounce(movement, 300)

    const { data, error, isLoading } = useQuery({
        queryFn: getHistoryForDate,
        queryKey: ["history", "group", historyDate.toDateString(), debouncedMovement],
        enabled: movement != ""
    });

    return (
        <div className="focusedHistory">
            <h3>{movement}</h3>
            <hr />
            <ul className="focusedHistoryList">
                {
                    movement === "" ?
                        <span className="darkFont">No movement selected</span>
                    : isLoading ?
                        <Loading />
                    : error ?
                        <ServerError error={error}/>
                    : data?.length > 0 ?
                        data.map((historyItem: HistoryItem) => (
                            <HistoryRow
                                movement={historyItem.movement}
                                time={historyItem.time}
                                weight={historyItem.weight}
                                subWeight={historyItem.subweight}
                                reps={historyItem.reps}
                                subReps={historyItem.subreps}
                                key={historyItem.setid}
                                setid={historyItem.setid}
                                className="focusedHistoryRow"
                                timeClassName="focusedHistoryTime"
                            />
                        ))
                    : <></>
                }
            </ul>
        </div>
    )
}

export default FocusedSetHistory;