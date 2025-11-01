import { ChangeEvent, useState } from "react"
import CardioLogButton from "./CardioLogButton";

type CardioMenuProps = {
    onLogSuccess: (xpParticleMultiplier: number) => void;
}

function CardioMenu({ onLogSuccess }: CardioMenuProps) {

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

    return (
        <form>
            <div className="logButtonsContainer">
                <label htmlFor="cardioMovement">Exercise</label>
                <input type="text" id="cardioMovement" 
                    className="longTextInput movementPicker"
                    style={{width: "75%"}}
                    value={cardioMovement}
                    onChange={handleChange}
                    />
                <div className="logFlexRow">
                    <div style={{flex: 1}}>
                        <label htmlFor="cardioTime">Time</label>
                        <br />
                        <input type="number" id="cardioTime"
                            className="smallTextInput setInput"
                            value={cardioTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{flex: 1}}>
                        <label htmlFor="cardioDistance">Distance</label>
                        <br />
                        <input type="number" id="cardioDistance"
                            className="smallTextInput setInput"
                            value={cardioDistance}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <label htmlFor="cardioNote">Note</label>
                <textarea id="cardioNote"
                    className="longTextInput noteTextBox"
                    placeholder="(Optional for more info)"
                    value={cardioNote}
                    onChange={handleChange}
                />
                <div className="logFlexRow">
                    <CardioLogButton 
                        movement={cardioMovement}
                        time={cardioTime === "" ? 0 : cardioTime}
                        distance={cardioDistance === "" ? 0.0 : cardioDistance}
                        note={cardioNote}
                        onLogSuccess={onLogSuccess}
                    />
                </div>
            </div>
        </form>
    )
}

export default CardioMenu