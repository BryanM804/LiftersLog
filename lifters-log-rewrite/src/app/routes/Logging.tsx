import { ChangeEvent, useState } from "react";
import MovementPicker from "../../features/logging/components/MovementPicker";
import SetInput from "../../features/logging/components/SetInput";
import "../../features/logging/logging.css";
import RecentHistory from "../../features/logging/components/RecentHistory";
import MovementContextProvider from "../../features/logging/contexts/MovementContextProvider";
import LogButton from "../../features/logging/components/LogButton";
import NoteSection from "../../features/logging/components/NoteSection";
import AuthChecker from "../../components/AuthChecker";

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

    function clearInputs() {
        setWeight(0.0);
        setReps(0);
        setSubReps(0);
        setSubWeight(0.0);
    }
    
    return (
        <div className="mainContentPane">
            <AuthChecker />
            <MovementContextProvider>
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
                        <SetInput type="weight" onChange={(e: ChangeEvent<HTMLInputElement>) => setWeight(parseInt(e.target.value))} side={2} value={weight}/>
                    </div>
                    {
                        (splitMovement && userSplits) && 
                        <div className="gridItem">
                            <SetInput type="weight" onChange={(e: ChangeEvent<HTMLInputElement>) => setSubWeight(parseInt(e.target.value))} side={2} value={subWeight}/>
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