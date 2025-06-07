import { useState } from "react";
import useLongPress from "../../../hooks/useLongPress";
import TextInputPopup from "../../../components/TextInputPopup";
import { useDate } from "../contexts/DateContextProvider";
import FadePopup from "../../../components/FadePopup";

const ERROR_DURATION = 1.5

type HistoryButtonProps = {
    direction: string;
}

function HistoryButton({ direction }: HistoryButtonProps) {

    const extraClass = direction == "back" ? "leftHistoryButton" : "rightHistoryButton"

    const [changingDate, setChangingDate] = useState(false)
    const [invalidDateEntry, setInvalidDateEntry] = useState(false)

    const { historyDate, setHistoryDate, selectableDates, selectedIndex, setSelectedIndex } = useDate()
    const { holdHandlers } = useLongPress(() => setChangingDate(true));

    function handleBackClick() {
        if (selectableDates) {
            if (selectedIndex > 0) {
                setHistoryDate(new Date(Date.parse(selectableDates[selectedIndex - 1])));
                setSelectedIndex(selectedIndex - 1)
            }
        } else {
            historyDate.setDate(historyDate.getDate() - 1);
            setHistoryDate(new Date(Date.parse(historyDate.toDateString())));   
        }
    }
    function handleForwardClick() {
        if (selectableDates) {
            if (selectedIndex < selectableDates.length - 1) {
                setHistoryDate(new Date(Date.parse(selectableDates[selectedIndex + 1])));
                setSelectedIndex(selectedIndex + 1)
            }
        } else {
            historyDate.setDate(historyDate.getDate() + 1);
            setHistoryDate(new Date(Date.parse(historyDate.toDateString())))
        }
        
    }

    function jumpToDate(enteredDate: string) {
        const parsedDate = Date.parse(enteredDate)
        if (!isNaN(parsedDate)) {
            setHistoryDate(new Date(parsedDate))
            setChangingDate(false)
        } else {
            setInvalidDateEntry(true)
            setTimeout(() => {
                setInvalidDateEntry(false)
            }, ERROR_DURATION * 1000)
        }
    }

    return (
        <>
            {
                invalidDateEntry && <FadePopup text="Invalid date" duration={ERROR_DURATION} />
            }
            {
                changingDate && <TextInputPopup message="Jump to date" confirmFn={jumpToDate} cancelFn={() => setChangingDate(false)}/>
            }
            <button 
                className={"floatingButton " + extraClass} 
                onClick={direction == "back" ? handleBackClick : handleForwardClick} 
                style={{userSelect: "none"}}
                {...holdHandlers}>
                {
                    direction == "back" ?
                    "<"
                    :
                    ">"
                }
            </button>
        </>
    )
}

export default HistoryButton;