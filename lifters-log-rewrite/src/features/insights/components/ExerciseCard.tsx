import { useQuery } from "@tanstack/react-query";
import getExericseInfo from "../api/getExerciseInfo";
import { useEffect, useState } from "react";
import getRecentExerciseActivity from "../api/getRecentExerciseActivity";

type ExerciseCardProps = {
    exerciseid: number;
    movement?: string;
    onCancel: () => void;
}

type RecentSet = {
    weight: number;
    reps: number;
    subWeight?: number;
    subReps?: number;
    time: string;
}

function ExerciseCard({ exerciseid, movement, onCancel }: ExerciseCardProps) {

    const [exerciseName, setExerciseName] = useState(`${movement ? movement : "Exercise"}`)
    const [description, setDescription] = useState("")

    const { data, isLoading, error } = useQuery({
        queryFn: getExericseInfo,
        queryKey: ["exerciseInfo", exerciseid],
    });

    const { data: recentSets, isLoading: recentSetsLoading, error: recentSetsError} = useQuery({
        queryFn: getRecentExerciseActivity,
        queryKey: ["recentSets", exerciseid]
    })

    useEffect(() => {
        if (data) {
            if (data.name) setExerciseName(data.name)
            if (data.description) setDescription(data.description)
        }
    }, [data])

    if (isLoading) {
        return (
            <div className="backgroundDim" onClick={onCancel}></div>
        )
    }

    return (
        <>
            <div className="backgroundDim" onClick={onCancel}></div>
            <div
                className="popupMenu"
            >
                <h3 style={{marginTop: 0}}>{exerciseName}<hr style={{marginBottom: "1rem", marginTop: 0, opacity: "75%"}}/></h3>
                {
                    description && <h5>{description}</h5>
                }
                <h4>Recent Sets<hr /></h4>
                <ul>
                    {
                        recentSets && recentSets.map((recentDateGroup: {date: string, items: RecentSet[]}) => {
                            return (
                                <div key={recentDateGroup.date}>
                                    <h3>{recentDateGroup.date}<hr/ ></h3>
                                    {
                                        recentDateGroup.items.map((recentSet: RecentSet) => {
                                            return (
                                                <div>
                                                    {recentSet.weight} reps x {recentSet.reps} lbs
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </ul>
                <div style={{display: "flex", flexDirection: "row", gap: "3rem", justifySelf: "center", justifyContent: "space-between"}}>
                    <button
                        
                        className="floatingButton"
                    >
                        share
                    </button>
                    <button
                        className="floatingButton confirmationButton"
                    >
                        add or remove or delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default ExerciseCard