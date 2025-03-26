import "../../features/logging/logging.css";
import RecentHistory from "../../features/logging/components/RecentHistory";
import MovementContextProvider from "../../features/logging/contexts/MovementContextProvider";
import NoteSection from "../../features/logging/components/NoteSection";
import AuthChecker from "../../components/AuthChecker";
import LogMenu from "../../features/logging/components/LogMenu";

function Logging() {

    return (
        <div className="mainContentPane">
            <AuthChecker />
            <MovementContextProvider>
                <LogMenu />
                <NoteSection />
                <RecentHistory />
            </MovementContextProvider>
        </div>
    )
}

export default Logging;