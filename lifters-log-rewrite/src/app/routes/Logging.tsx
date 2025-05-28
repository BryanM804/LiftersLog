import "../../features/logging/logging.css";
import RecentHistory from "../../features/logging/components/RecentHistory";
import MovementContextProvider from "../../features/logging/contexts/MovementContextProvider";
import NoteSection from "../../features/logging/components/NoteSection";
import AuthChecker from "../../components/AuthChecker";
import LogMenu from "../../features/logging/components/LogMenu";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useState } from "react";
import CardioMenu from "../../features/logging/components/CardioMenu";

function Logging() {

    // False for lift, true for cardio
    const [logMode, setLogMode] = useState(false);

    return (
        <>
        <AuthChecker />
        <div style={{margin: "0.5rem"}}>
            <ToggleSwitch offLabel="Lift" onLabel="Cardio" 
            onChange={() => setLogMode(!logMode)}
            type="dark"
            />
        </div>
        <div className="mainContentPane">
            <MovementContextProvider>
                <LogMenu logMode={logMode} />
                <CardioMenu logMode={logMode} />
                <NoteSection logMode={logMode} />
                <RecentHistory />
            </MovementContextProvider>
        </div>
        </>
    )
}

export default Logging;