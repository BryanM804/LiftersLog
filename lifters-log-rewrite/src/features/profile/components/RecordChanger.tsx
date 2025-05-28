import { useMutation, useQueryClient } from "@tanstack/react-query"
import updateRecord from "../api/updateRecord"
import { ChangeEvent, useState } from "react"
import HalfGap from "../../../components/HalfGap";

type RecordChangerProps = {
    type: string;
    initWeight: number;
}

function RecordChanger({ type, initWeight }: RecordChangerProps) {

    const queryClient = useQueryClient();
    const updateMutation  = useMutation({
        mutationFn: updateRecord,
        onSuccess: () => {
            setIsChanging(false)
            queryClient.invalidateQueries({ queryKey: ["records"] })
        }
    })

    const [isChanging, setIsChanging] = useState(false)
    const [newWeight, setNewWeight] = useState(initWeight > 0 ? initWeight : 0.0)

    function updateNewWeight(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value == "") {
            setNewWeight(-1.0)
        } else {
            setNewWeight(parseFloat(e.target.value))
        }
    }

    function changeRecord() {
        updateMutation.mutate({type: type, weight: newWeight})
    }

    if (isChanging) {
        return (
            <>
                <input className="smallTextInput" style={{width: "25%"}} type="text" onChange={updateNewWeight} value={newWeight >= 0 ? newWeight : ""} />
                <HalfGap />
                <button className="smallFloatingButton smallMenuButton" onClick={changeRecord}>Confirm</button>
                <button className="smallFloatingButton smallMenuButton" onClick={() => setIsChanging(false)}>Cancel</button>
            </>
        )
    }

    return (
        <>
            {
                initWeight > 0 ?
                    initWeight
                :
                    "N/A"
            }
            <a onClick={() => setIsChanging(true)}>
                <img src="./src/assets/edit.png" height={20} width={20} className="editButton" />
            </a>
        </>
    )
}

export default RecordChanger