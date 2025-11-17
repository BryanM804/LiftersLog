import { useState } from "react";
import NoteMenu from "./NoteMenu";


function AddNoteButton() {
    const [addingNote, setAddingNote] = useState(false);

    return (
        <>
            {
                addingNote && 
                <NoteMenu onCancel={() => setAddingNote(false)}/>
            }
            <button className="addNoteButton" onClick={() => setAddingNote(!addingNote)}>+</button>
        </>
    )
}

export default AddNoteButton;