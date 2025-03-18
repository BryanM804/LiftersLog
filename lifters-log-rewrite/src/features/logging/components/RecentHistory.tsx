import HistoryList from "../../history/components/HistoryList";



function RecentHistory() {
    return (
        <div className="recentHistory">
            <div className="recentHistorySpan">
                <h3 style={{padding: "0", margin: "0"}}>Recent History</h3>
                <hr />
            </div>
                <HistoryList date={new Date().toDateString()} className={"recentHistoryList"} 
                placeholder={"No recent activity for today."} placeholderClass="recentHistorySpan"/>
        </div>
    )
}

export default RecentHistory;