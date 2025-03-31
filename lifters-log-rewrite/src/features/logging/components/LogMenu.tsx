import { ChangeEvent, useState } from "react"
import MovementPicker from "./MovementPicker"
import SetInput from "./SetInput"
import LogButton from "./LogButton"


function LogMenu() {
    const [reps, setReps] = useState(0)
    const [weight, setWeight] = useState(0.0)
    const [subReps, setSubReps] = useState(0)
    const [subWeight, setSubWeight] = useState(0.0)
    
    // User split preference will be set from account
    const [userSplits, setUserSplits] = useState(true)
    const [splitMovement, setSplitMovement] = useState(false)

    function changeSplit(newSplit: boolean) {
        setSplitMovement(newSplit)
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

    return (
        <form>
                <div className="logGridContainer">
                    <div className="gridItemSpan">
                        <MovementPicker changeSplit={changeSplit} onClear={clearInputs}/>
                    </div>
                    {
                        (splitMovement && userSplits) && 
                        <>
                            <div className="gridItem" style={{textAlign: "center"}}>Left<hr /></div>
                            <div className="gridItem" style={{textAlign: "center"}}>Right<hr /></div>
                        </>
                    }
                    <div className="gridItem">
                        <SetInput type="rep" onChange={handleChange} id="repInput" value={reps}/>
                    </div>
                    {
                        (splitMovement && userSplits) && 
                        <div className="gridItem">
                            <SetInput type="rep" onChange={handleChange} id="subRepInput" value={subReps}/>
                        </div>
                    }
                    <div className="gridItem">
                        <SetInput type="weight" onChange={handleChange} id="weightInput" value={weight}/>
                    </div>
                    {
                        (splitMovement && userSplits) && 
                        <div className="gridItem">
                            <SetInput type="weight" onChange={handleChange} id="subWeightInput" value={subWeight}/>
                        </div>
                    }
                    <LogButton reps={reps} weight={weight} subReps={subReps} subWeight={subWeight} />
                </div>
            </form>
    )
}

export default LogMenu