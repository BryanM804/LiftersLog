import { useQuery } from "@tanstack/react-query";
import getExericseInfo from "../api/getExerciseInfo";
import { useEffect, useState } from "react";

type ExerciseCardProps = {
    exerciseid: number;
    movement?: string;
    onCancel: () => void;
}

function ExerciseCard({ exerciseid, movement, onCancel }: ExerciseCardProps) {

    // This will query for the movement name even though there are ways I could get it without a query
    // becuase later I will probably include more in that query

    const [exerciseName, setExerciseName] = useState("Exercise")
    const [description, setDescription] = useState("")

    const { data, isLoading, error } = useQuery({
        queryFn: getExericseInfo,
        queryKey: ["exerciseInfo", exerciseid],
    });

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
                <p>placeholder</p>
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