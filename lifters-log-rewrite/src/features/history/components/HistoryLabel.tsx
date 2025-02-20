import { useEffect, useState } from "react";

type HistoryLabelProps = {
    date: string;
}

function HistoryLabel({ date }: HistoryLabelProps) {

    const [labelText, setLabelText] = useState("Placeholder Label");
    const [changingLabel, setChangingLabel] = useState(false);

    useEffect(() => {
        // Get label from server
    }, [])

    return (
        <>
            {
                changingLabel ? 
                <form>
                    <input type="text" className="smallTextInput" />
                    <br />
                    <input type="submit" className="smallFloatingButton" value="✅" />
                    <button onClick={() => setChangingLabel(false)} className="smallFloatingButton">Cancel</button>
                </form>
                :
                <h3 id="currentLabel" className="historyLabel" onClick={() => setChangingLabel(true)}>
                    {labelText}
                </h3>
            }
        </>
    )
}

export default HistoryLabel;