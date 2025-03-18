import { useState } from "react";
import HistoryButton from "../../features/history/components/HistoryButton";
import HistoryLabel from "../../features/history/components/HistoryLabel";
import "../../features/history/history.css";
import AuthChecker from "../../components/AuthChecker";
import HistoryList from "../../features/history/components/HistoryList";

function History() {

    const [currentDate, setCurrentDate] = useState(new Date().toDateString())

    function handleBackClick() {
        let date = new Date(Date.parse(currentDate))
        date.setDate(date.getDate() - 1);
        setCurrentDate(date.toDateString());
    }
    function handleForwardClick() {
        let date = new Date(Date.parse(currentDate))
        date.setDate(date.getDate() + 1);
        setCurrentDate(date.toDateString());
    }


    return (
        <div className="mainContentPane">
            <AuthChecker />
            <div className="historyList">
                <div className="historyTitle historyItemSpan">
                    <HistoryButton direction="back" onClick={handleBackClick}/>
                    <HistoryLabel date={currentDate}/>
                    <HistoryButton direction="forward" onClick={handleForwardClick} />
                </div>
            </div>
            <div style={{marginTop: "1rem"}}>
                <HistoryList date={currentDate} className={"historyList"} placeholder={"No history for this date."} placeholderClass="historyItemSpan"/>
            </div>
        </div>
    )
}

export default History;