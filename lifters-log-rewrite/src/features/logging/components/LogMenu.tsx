import { ChangeEvent, useEffect, useState } from "react"
import MovementPicker from "./MovementPicker"
import SetInput from "./SetInput"
import LogButton from "./LogButton"
import { useMovement } from "../contexts/MovementContextProvider"
import { useQuery } from "@tanstack/react-query"
import getSplitMovements from "../api/getSplitMovements"

function LogMenu() {

    const {
        movement,
        reps,
        subReps,
        weight,
        subWeight,
        setReps,
        setSubReps,
        setWeight,
        setSubWeight
    } = useMovement()
    
    // User split preference will be set from account
    const [userSplits, setUserSplits] = useState(true)
    const [splitMovement, setSplitMovement] = useState(false)

    const { data: splitMovements } = useQuery({
        queryKey: ["splitMovements"],
        queryFn: getSplitMovements,
        staleTime: Infinity
    });

    function isSplittableMovement(m: string) {
        for (const s of splitMovements) {
            if (s.movement == m)
                return true;
        }
        return false;
    }

    function parseAndRound(s: string) {
        if (s.length === 0) {
            return 0.0
        }

        return parseFloat(parseFloat(s).toFixed(2));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const id = e.target.id
        const input = e.target.value

        if (id === "repInput") {
            const val = input.length === 0 ? 0 : parseInt(input)
            setReps(val)
        } else if (id === "subRepInput") {
            const val = input.length === 0 ? 0 : parseInt(input)
            setSubReps(val)
        } else if (id === "weightInput") {
            const val = parseAndRound(input)
            setWeight(val)
        } else if (id === "subWeightInput") {
            const val = parseAndRound(input)
            setSubWeight(val)
        }
    }

    function clearInputs() {
        setWeight(0.0);
        setReps(0);
        setSubReps(0);
        setSubWeight(0.0);
    }

    useEffect(() => {
        if (movement && isSplittableMovement(movement)) {
            if (userSplits) {
                setSplitMovement(true)
            }
        } else {
            setSplitMovement(false)
        }
    }, [movement])

    return (
        <form>
            <div className="logGridContainer">
                <div className="gridItemSpan">
                    <MovementPicker onClear={clearInputs} label="Exercise"/>
                </div>
                {
                    splitMovement && 
                    <>
                        <div className="gridItem" style={{textAlign: "center"}}>Left<hr /></div>
                        <div className="gridItem" style={{textAlign: "center"}}>Right<hr /></div>
                    </>
                }
                <div className="gridItem">
                    <SetInput type="rep" onChange={handleChange} id="repInput" value={reps}/>
                </div>
                {
                    splitMovement && 
                    <div className="gridItem">
                        <SetInput type="rep" onChange={handleChange} id="subRepInput" value={subReps}/>
                    </div>
                }
                <div className="gridItem">
                    <SetInput type="weight" onChange={handleChange} id="weightInput" value={weight}/>
                </div>
                {
                    splitMovement && 
                    <div className="gridItem">
                        <SetInput type="weight" onChange={handleChange} id="subWeightInput" value={subWeight}/>
                    </div>
                }
                <LogButton />
            </div>
        </form>
    )
}

export default LogMenu