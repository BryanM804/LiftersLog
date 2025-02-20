import { useState } from "react";
import HistoryButton from "../features/history/components/HistoryButton";
import HistoryLabel from "../features/history/components/HistoryLabel";
import HistoryRow from "../features/history/components/HistoryRow";
import "../features/history/history.css";


function History() {

    const [currentDate, setCurrentDate] = useState("")

    function handleBackClick() {
        console.log("back")
    }
    function handleForwardClick() {
        console.log("forward")
    }

    return (
        <div className="mainContentPane">
            <div className="historyTitle">
                <HistoryButton direction="back" onClick={handleBackClick}/>
                <HistoryLabel date={currentDate}/>
                <HistoryButton direction="forward" onClick={handleForwardClick} />
            </div>
            <ul className="historyList historyPane">
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
                <HistoryRow time="12:30 PM" movement="Barbell Bench Press" weight={135} reps={12} setid={1}/>
            </ul>
        </div>
    )
}

export default History;