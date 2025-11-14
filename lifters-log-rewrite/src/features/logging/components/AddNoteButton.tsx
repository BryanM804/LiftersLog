import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import addNewNote from "../api/addNewNote";
import { useMovement } from "../contexts/MovementContextProvider";
import { Tooltip } from "react-tooltip";
import ToggleSwitch from "../../../components/ToggleSwitch";
import PopupMenu from "../../../components/PopupMenu";
import { useDate } from "../../history/contexts/DateContextProvider";


function AddNoteButton() {

    const tooltipText = "Sticky notes will appear every time you select a movement."

    const [addingNote, setAddingNote] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [stickyNote, setStickyNote] = useState(false);
    
    const queryClient = useQueryClient();
    const { movement } = useMovement();
    const { historyDate } = useDate();

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
            noteMutation.mutate({ movement: movement, text: noteText, sticky: stickyNote, date: historyDate.toDateString()});
        }
    }

    return (
        <>
            {
                addingNote && 
                <PopupMenu
                    title="Add Note"
                    onSubmit={handleAddNote}
                    onCancel={() => setAddingNote(false)}
                >
                    <form className="addNoteForm">
                        <textarea className="longTextInput noteTextBox" id="noteInput" value={noteText} onChange={changeNoteText}/>
                        <br />
                        <div data-tooltip-id="sticky" style={{marginTop: "0.5rem"}}>
                            <ToggleSwitch  onChange={() => setStickyNote(!stickyNote)} 
                                label="Sticky"
                                />
                        </div>
                        <Tooltip id="sticky" place="top" content={tooltipText} className="niceTooltip"/>
                    </form>
                </PopupMenu>
            }
            <button className="addNoteButton" onClick={() => setAddingNote(!addingNote)}>+</button>
        </>
    )
}

export default AddNoteButton;