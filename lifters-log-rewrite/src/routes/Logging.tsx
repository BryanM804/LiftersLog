import { ChangeEvent, useState } from "react";
import MovementPicker from "../features/logging/components/MovementPicker";
import SetInput from "../features/logging/components/SetInput";
import "../features/logging/logging.css";
import RecentHistory from "../features/logging/components/RecentHistory";
import MovementContextProvider from "../features/logging/contexts/MovementContextProvider";
import LogButton from "../features/logging/components/LogButton";
import NoteSection from "../features/logging/components/NoteSection";

function Logging() {
    
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
    
    return (
        <div className="mainContentPane">
            <MovementContextProvider>
            <form>
                <div className="logGridContainer">
                    <div className="gridItemSpan">
                        <MovementPicker changeSplit={changeSplit}/>
                    </div>
                    {
                        (splitMovement && userSplits) && 
                        <>
                            <div className="gridItem" style={{textAlign: "center"}}>Left<hr /></div>
                            <div className="gridItem" style={{textAlign: "center"}}>Right<hr /></div>
                        </>
                    }
                    <div className="gridItem">
                        <SetInput type="rep" onChange={(e: ChangeEvent<HTMLInputElement>) => setReps(parseInt(e.target.value))} side={1} />
                    </div>
                    {
                        (splitMovement && userSplits) && 
                        <div className="gridItem">
                            <SetInput type="rep" onChange={(e: ChangeEvent<HTMLInputElement>) => setSubReps(parseInt(e.target.value))} side={2} />
                        </div>
                    }
                    <div className="gridItem">
                        <SetInput type="weight" onChange={(e: ChangeEvent<HTMLInputElement>) => setWeight(parseInt(e.target.value))} side={2} />
                    </div>
                    {
                        (splitMovement && userSplits) && 
                        <div className="gridItem">
                            <SetInput type="weight" onChange={(e: ChangeEvent<HTMLInputElement>) => setSubWeight(parseInt(e.target.value))} side={2} />
                        </div>
                    }
                    <LogButton reps={reps} weight={weight} subReps={subReps} subWeight={subWeight} />
                </div>
            </form>
            
            <NoteSection />
            <RecentHistory />
            </MovementContextProvider>
        </div>
    )
}

export default Logging;