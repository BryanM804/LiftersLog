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
        return parseFloat(parseFloat(s).toFixed(2));
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
                        <SetInput type="rep" onChange={(e: ChangeEvent<HTMLInputElement>) => setReps(parseInt(e.target.value))} side={1} value={reps}/>
                    </div>
                    {
                        (splitMovement && userSplits) && 
                        <div className="gridItem">
                            <SetInput type="rep" onChange={(e: ChangeEvent<HTMLInputElement>) => setSubReps(parseInt(e.target.value))} side={2} value={subReps}/>
                        </div>
                    }
                    <div className="gridItem">
                        <SetInput type="weight" onChange={(e: ChangeEvent<HTMLInputElement>) => setWeight(parseAndRound(e.target.value))} side={2} value={weight}/>
                    </div>
                    {
                        (splitMovement && userSplits) && 
                        <div className="gridItem">
                            <SetInput type="weight" onChange={(e: ChangeEvent<HTMLInputElement>) => setSubWeight(parseAndRound(e.target.value))} side={2} value={subWeight}/>
                        </div>
                    }
                    <LogButton reps={reps} weight={weight} subReps={subReps} subWeight={subWeight} />
                </div>
            </form>
    )
}

export default LogMenu