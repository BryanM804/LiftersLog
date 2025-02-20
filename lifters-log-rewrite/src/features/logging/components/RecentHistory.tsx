import HistoryRow from "../../history/components/HistoryRow";



function RecentHistory() {
    return (
        <div className="recentHistory">
            <div className="recentHistorySpan">
                <h3 style={{padding: "0", margin: "0"}}>Recent History</h3>
                <hr />
            </div>
            <ul className="recentHistoryList">
                <HistoryRow time="12:30 PM" movement="Hammer Strength Machine High Row" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="1:230 PM"movement="Hammer Strength Machine High Row" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Lat Pulldown" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
            </ul>
        </div>
    )
}

export default RecentHistory;