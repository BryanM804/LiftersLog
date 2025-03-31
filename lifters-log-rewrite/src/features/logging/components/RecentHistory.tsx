import HistoryList from "../../history/components/HistoryList";
import { useMovement } from "../contexts/MovementContextProvider";



function RecentHistory() {

    const {movement, setMovement} = useMovement();

    function handleMovementChange(m: string) {
        setMovement(m);
    }

    return (
        <div className="recentHistory">
            <div className="recentHistorySpan">
                <h3 style={{padding: "0", margin: "0"}}>Recent History</h3>
                <hr />
            </div>
                <HistoryList date={new Date().toDateString()} className={"recentHistorySpan recentHistoryList"} 
                    placeholder={"No recent activity for today."} placeholderClass="recentHistorySpan"
                    movementChange={handleMovementChange}
                    />
        </div>
    )
}

export default RecentHistory;