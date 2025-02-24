import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import addNewNote from "../api/addNewNote";
import { useMovement } from "../contexts/MovementContextProvider";
import { Tooltip } from "react-tooltip";


function AddNoteButton() {

    const tooltipText = "Sticky notes will appear every time you select a movement."

    const [addingNote, setAddingNote] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [stickyNote, setStickyNote] = useState(false);
    
    const queryClient = useQueryClient();
    const { movement } = useMovement();

    const noteMutation = useMutation({
        mutationFn: addNewNote,
        onSuccess: () => {
            // Refresh notes when new note is added
            queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
            setAddingNote(false);
            setNoteText("");
            setStickyNote(false);
        }
    })

    function changeNoteText(e: ChangeEvent<HTMLTextAreaElement>) {
        setNoteText(e.target.value);
    }

    function handleAddNote(e: SyntheticEvent) {
        e.preventDefault();
        if (noteText.length > 0 && movement != "") {
            noteMutation.mutate({ movement: movement, text: noteText, sticky: stickyNote });
        }
    }

    return (
        <>
            {
                addingNote && 
                <div className="addNote">
                    <form className="addNoteForm">
                        <textarea className="longTextInput noteTextBox" id="noteInput" value={noteText} onChange={changeNoteText}/>
                        <br />
                        <label data-tooltip-id="sticky" htmlFor="stickyCheck" className="plainLink">
                            Sticky
                            <input type="checkbox" id="stickyCheck" className="stickyCheck" checked={stickyNote} onChange={() => setStickyNote(!stickyNote)}/>
                        </label>
                        <Tooltip id="sticky"  place="top" content={tooltipText}/>
                        <br />
                        <button className="smallFloatingButton" onClick={handleAddNote} style={{marginTop: "1rem"}}>✅</button>
                        <button className="smallFloatingButton" onClick={() => setAddingNote(false)} style={{marginTop: "1rem"}}>❌</button>
                    </form>
                </div>
            }
            <button className="addNoteButton" onClick={() => setAddingNote(!addingNote)}>+</button>
        </>
    )
}

export default AddNoteButton;