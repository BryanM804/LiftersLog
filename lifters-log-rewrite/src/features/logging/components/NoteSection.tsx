import { Tooltip } from "react-tooltip";
import { useMovement } from "../contexts/MovementContextProvider";
import Note from "./Note";


function NoteSection() {

    const { movement } = useMovement();
    const tooltipString = "Save notes that \"stick\" to the selected movement."
    
    // Use movement to get the existing notes from the server

    return (
        <div className="noteSection">
            <div style={{gridColumn: "span 3"}}>
                <h3 data-tooltip-id="notesTooltip" style={{padding: 0, margin: 0}}>Notes</h3>
                <hr />
                <Tooltip id="notesTooltip" place="top" content={tooltipString} />
            </div>
            <ul style={{gridColumn: "span 3"}}>
                <Note text="Epic boner"/>
            </ul>
        </div>
    )
}

export default NoteSection;