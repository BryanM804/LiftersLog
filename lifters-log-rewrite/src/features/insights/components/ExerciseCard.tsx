import { useMutation, useQuery } from "@tanstack/react-query";
import getExericseInfo from "../api/getExerciseInfo";
import { useEffect, useState } from "react";
import getRecentExerciseActivity from "../api/getRecentExerciseActivity";
import FadePopup from "../../../components/FadePopup";
import { useMovement } from "../../logging/contexts/MovementContextProvider";
import changeLibraryExercise from "../api/changeLibraryExercise";

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

// type ExerciseDetails = {
//     name: string;
//     description: string;
//     inLibrary: boolean;
// }

const FADE_DURATION = 2

function ExerciseCard({ exerciseid, movement, onCancel }: ExerciseCardProps) {

    const [exerciseName, setExerciseName] = useState(`${movement ? movement : "Exercise"}`)
    const [description, setDescription] = useState("")
    const [popupText, setPopupText] = useState("")
    const [rightButtonText, setRightButtonText] = useState("Add")

    const shareCode = `<|llex${exerciseid}#-#${movement}!>`

    const { data, isLoading, error } = useQuery({
        queryFn: getExericseInfo,
        queryKey: ["exerciseInfo", exerciseid],
    });

    const { data: recentSets, isLoading: recentSetsLoading, error: recentSetsError} = useQuery({
        queryFn: getRecentExerciseActivity,
        queryKey: ["recentSets", exerciseid]
    })

    const changeExerciseMutation = useMutation({
        mutationFn: changeLibraryExercise,
        onSuccess: () => {
            const type = getButtonType()

            if (type == "add") {
                showPopupText(`${movement} successfully added to your library! You may have to refresh for it to appear.`)
            } else if (type == "remove") {
                showPopupText(`${movement} successfully removed from your library!`)
            } else if (type == "delete") {
                showPopupText(`${movement} successfully deleted!`)
            }

        }
    });

    useEffect(() => {
        if (data) {
            if (data.name) setExerciseName(data.name)
            if (data.description) setDescription(data.description)

            if (data.inLibrary) {
                if (data.isOwner) {
                    setRightButtonText("Delete exercise")
                } else if (data.creatorid != null && data.creatorid == 0){
                    setRightButtonText("null")
                } else {
                    setRightButtonText("Remove from library")
                }
            } else {
                setRightButtonText("Add to library")
            }
        }
    }, [data])

    async function handleShare() {
        try{
            await navigator.clipboard.writeText(shareCode)
            showPopupText("Code copied to clipboard. Paste into a chatroom to share with others!")
        } catch (error) {
            showPopupText(`Failed to copy code: ${error}`)
        }
    }

    function getButtonType() {
        const buttonWords = rightButtonText.split(" ")
        const type = buttonWords[0].toLowerCase()

        return type;
    }

    function handleRightButtonClick() {
        changeExerciseMutation.mutate({exerciseid, changeType: getButtonType()})
    }

    function showPopupText(newText: string) {
        setPopupText(newText)
        setTimeout(() => {
            setPopupText("")
        }, FADE_DURATION * 1000)
    }

    if (isLoading) {
        return (
            <div className="backgroundDim" onClick={onCancel}></div>
        )
    }

    return (
        <>
            {
                popupText != "" &&
                <FadePopup text={popupText} duration={FADE_DURATION}/>
            }
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
                                                <div key={recentSet.time}>
                                                    {recentSet.weight} lbs x {recentSet.reps} reps
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </ul>
                <div style={{display: "flex", flexDirection: "row", gap: "2rem", justifySelf: "center", justifyContent: "space-between"}}>
                    <button
                        className="floatingButton"
                        onClick={handleShare}
                    >
                        Share
                    </button>
                    {
                        rightButtonText != "null" &&
                        <button
                            className="floatingButton confirmationButton"
                            onClick={handleRightButtonClick}
                        >
                            {rightButtonText}
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default ExerciseCard