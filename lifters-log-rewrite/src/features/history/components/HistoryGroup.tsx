import { useQuery } from "@tanstack/react-query";
import getHistoryForDate from "../api/getHistoryForDate";
import HistoryItem from "../types/HistoryItem";
import HistoryRow from "./HistoryRow";
import ServerError from "../../../components/ServerError";
import Loading from "../../../components/Loading";
import ItemNotes from "./ItemNotes";
import { useMovement } from "../../logging/contexts/MovementContextProvider";
import { useDate } from "../contexts/DateContextProvider";
import useLongPress from "../../../hooks/useLongPress";
import { useEffect, useState } from "react";
import ExerciseCard from "../../insights/components/ExerciseCard";


type HistoryGroupProps = {
    movement: string;
    exerciseid: number;
    onClick?: () => void;
}

function HistoryGroup({ movement, exerciseid, onClick }: HistoryGroupProps) {

    const [exerciseCardOpen, setExerciseCardOpen] = useState(false);
    const [hasPendingClick, setHasPendingClick] = useState(false);

    const { 
        setMovement,
        setWeight,
        setSubWeight,
        setReps,
        setSubReps,
        setExerciseId
    } = useMovement()
    const { historyDate } = useDate()
    
    const { data, error, isLoading } = useQuery({
        queryKey: ["history", "group", historyDate.toDateString(), exerciseid],
        queryFn: getHistoryForDate
    });

    const { holdHandlers, isHolding, isHeld } = useLongPress(() => setExerciseCardOpen(true));

    useEffect(() => {
        if (isHeld && hasPendingClick) {
            setHasPendingClick(false)
        }

        if (hasPendingClick && !isHolding && !isHeld) {
            handleClick()
            setHasPendingClick(false)
        }
    }, [isHolding, isHeld])

    function handleClick() {
        if (isHolding) {
            setHasPendingClick(true)
            return
        }
        setMovement(movement)
        setWeight(0)
        setSubWeight(0)
        setReps(0)
        setSubReps(0)
        setExerciseId(exerciseid)
        onClick?.()
    }

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <>
        {
            exerciseCardOpen && 
            <ExerciseCard 
                exerciseid={exerciseid}
                movement={movement}
                onCancel={() => setExerciseCardOpen(false)}
            />
        }
        <div className="historyGroup">
            <div className="historyTitle" onClick={handleClick} {...holdHandlers}>
                {movement}
            </div>
            <hr />
            <ul className="historySubList">
                {
                    data.map((historyItem: HistoryItem) => 
                        // Even though the rows are all under a group, they need to know their movement
                        // so they can set the input boxes
                        <HistoryRow
                            movement={historyItem.Exercise.movement}
                            exerciseid={historyItem.exerciseid}
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
        </>
    )
}

export default HistoryGroup