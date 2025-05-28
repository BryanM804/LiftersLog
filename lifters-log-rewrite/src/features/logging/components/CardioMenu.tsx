import { ChangeEvent, useState } from "react"
import CardioLogButton from "./CardioLogButton";

type CardioMenuProps = {
    logMode: boolean;
}

function CardioMenu({ logMode }: CardioMenuProps) {

    const [cardioMovement, setCardioMovement] = useState("");
    const [cardioTime, setCardioTime] = useState<number | "">("");
    const [cardioDistance, setCardioDistance] = useState<number | "">("");
    const [cardioNote, setCardioNote] = useState("");

    function parseAndRound(s: string) {
        if (s.length === 0) {
            return 0.0
        }

        return parseFloat(parseFloat(s).toFixed(2));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const input = e.target.value

        if (e.target.id === "cardioMovement") {
            // Cardio movements can be anything the user enters
            setCardioMovement(e.target.value);
        } else if (e.target.id === "cardioTime") {
            const val = input.length === 0 ? 0 : parseInt(input)
            val === 0 ? setCardioTime("") : setCardioTime(val)
        } else if (e.target.id === "cardioDistance") {
            const val = parseAndRound(input)
            setCardioDistance(val)
            val === 0.0 ? setCardioDistance("") : setCardioDistance(val)
        } else if (e.target.id === "cardioNote") {
            setCardioNote(input)
        }
    }

    if (!logMode) return <></>

    return (
        <form>
            <div className="logGridContainer">
                <div className="gridItemSpan">
                    <label htmlFor="cardioMovement">Exercise</label>
                    <br />
                    <input type="text" id="cardioMovement" 
                        className="longTextInput movementPicker"
                        value={cardioMovement}
                        onChange={handleChange}
                        />
                </div>
                <div className="gridItem">
                    <label htmlFor="cardioTime">Time</label>
                    <br />
                    <input type="number" id="cardioTime"
                        className="smallTextInput setInput"
                        value={cardioTime}
                        onChange={handleChange}
                        />
                </div>
                <div className="gridItem">
                <label htmlFor="cardioDistance">Distance</label>
                <br />
                <input type="number" id="cardioDistance"
                    className="smallTextInput setInput"
                    value={cardioDistance}
                    onChange={handleChange}
                    />
                </div>
                <div className="gridItemSpan">
                <label htmlFor="cardioNote">Note</label>
                <br />
                <textarea id="cardioNote"
                    className="longTextInput noteTextBox"
                    placeholder="(Optional for more info)"
                    value={cardioNote}
                    onChange={handleChange}
                    />
                <CardioLogButton 
                    movement={cardioMovement}
                    time={cardioTime === "" ? 0 : cardioTime}
                    distance={cardioDistance === "" ? 0.0 : cardioDistance}
                    note={cardioNote}
                />
                </div>
            </div>
        </form>
    )
}

export default CardioMenu