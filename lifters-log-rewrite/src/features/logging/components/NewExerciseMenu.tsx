import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopupMenu from "../../../components/PopupMenu"
import { ChangeEvent, useState } from "react";
import ItemPicker from "../../../components/ItemPicker";
import { MUSCLE_GROUPS } from "../../../utils/constants";
import ToggleSwitch from "../../../components/ToggleSwitch";
import createNewExercise from "../api/createNewExercise";
import FadePopup from "../../../components/FadePopup";

type NewExerciseMenuProps = {
    onCancel: () => void;
}

function NewExerciseMenu({ onCancel }: NewExerciseMenuProps) {

    const queryClient = useQueryClient();

    const [newExerciseName, setNewExerciseName] = useState("")
    const [description, setDescription] = useState("")
    const [muscleGroup, setMuscleGroup] = useState("")
    const [isSplit, setIsSplit] = useState(false)
    const [isBodyweight, setIsBodyweight] = useState(false)

    const [errorText, setErrorText] = useState("");
    
    const newExerciseMutation = useMutation({
        mutationFn: createNewExercise,
        onSuccess: () => {
            onCancel()
            queryClient.invalidateQueries({ queryKey: ["movements"] })
        },
        onError: (error: Error) => {
            setErrorText(error.message)
        }
    });

    function handleTextChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const id = e.target.id;

        if (id === "exerciseName") {
            setNewExerciseName(e.target.value);
        } else if (id === "description") {
            setDescription(e.target.value)
        }
    }

    function handleSubmission() {
        const exerciseNameExp = new RegExp("^[a-zA-Z0-9\\s]+$")
        const validName = exerciseNameExp.test(newExerciseName)

        console.log("Valid Name" + validName)
        console.log("muscle group: " + muscleGroup)

        if (validName && muscleGroup != "") {
            console.log("MUTATE")
            newExerciseMutation.mutate({
                exerciseName: newExerciseName,
                muscleGroup: muscleGroup,
                isSplit: isSplit,
                isBodyweight: isBodyweight,
                description: description
            })
        } else {
            if (!validName) {
                setErrorText("Exercise name must only consist of letters, numbers, and spaces.")
            } else if (muscleGroup === "") {
                setErrorText("Please select a muscle group.")
            }
        }
    }
    
    return (
        <>
        <FadePopup 
            text={errorText}
            duration={2.5}
        />
        <PopupMenu
            title="Create new exercise"
            onSubmit={handleSubmission}
            onCancel={onCancel}
            confirmButtonText="Save"
        >
            New exercise name:
            <input 
                id="exerciseName"
                type="text"
                className="smallTextInput"
                value={newExerciseName}
                onChange={handleTextChange}
            />
            Description (Optional):
            <textarea 
                className="longTextInput noteTextBox" 
                id="description" 
                value={description} 
                onChange={handleTextChange}
            />
            Primary muscle group:
            <ItemPicker 
                placeholder="Select"
                options={MUSCLE_GROUPS}
                selected={muscleGroup}
                setSelected={setMuscleGroup}
            />
            <ToggleSwitch
                label="Split left and right sides"
                initialState={isSplit}
                onChange={() => setIsSplit(!isSplit)}
            />
            <ToggleSwitch
                label="Bodyweight exercise"  
                initialState={isBodyweight}
                onChange={() => setIsBodyweight(!isBodyweight)}
            />
        </PopupMenu>
        </>
    )
}

export default NewExerciseMenu