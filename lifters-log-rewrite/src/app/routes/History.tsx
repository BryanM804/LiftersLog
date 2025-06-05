import { ChangeEvent, useEffect, useState } from "react";
import HistoryButton from "../../features/history/components/HistoryButton";
import HistoryLabel from "../../features/history/components/HistoryLabel";
import "../../features/history/history.css";
import AuthChecker from "../../components/AuthChecker";
import HistoryList from "../../features/history/components/HistoryList";
import Insights from "../../features/insights/components/Insights";
import { useDate } from "../../features/history/contexts/DateContextProvider";
import ToggleSwitch from "../../components/ToggleSwitch";

function History() {

    const { historyDate, stickyDate, setStickyDate } = useDate()

    return (
        <div className="mainContentPane">
            <AuthChecker />
            <div className="historyList">
                <div className="historyTitle historyItemSpan">
                    <HistoryButton direction="back" />
                    <HistoryLabel />
                    <HistoryButton direction="forward" />
                </div>
            </div>
            <div style={{marginTop: "1rem"}}>
                <hr />
                <HistoryList className={"historyList"} placeholder={"No history for this date."} placeholderClass="historyItemSpan"/>
                {
                    new Date().getDate() != historyDate.getDate() &&
                    <>
                        <ToggleSwitch 
                            label="Log to this date" 
                            initialState={stickyDate} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setStickyDate(e.target.checked)} />
                    </>
                }
            </div>
            <Insights />
        </div>
    )
}

export default History;