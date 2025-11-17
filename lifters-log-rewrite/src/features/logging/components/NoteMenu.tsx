import PopupMenu from "../../../components/PopupMenu";
import { Tooltip } from "react-tooltip";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMovement } from "../contexts/MovementContextProvider";
import { useDate } from "../../history/contexts/DateContextProvider";
import addNewNote from "../api/addNewNote";
import editNote from "../api/editNote";

type NoteMenuProps = {
    onCancel: () => void;
    text?: string;
    noteid?: number;
    sticky?: boolean;
}

function NoteMenu({ onCancel, text, noteid, sticky }: NoteMenuProps) {
    const tooltipText = "Sticky notes will appear every time you select a movement."

    const [noteText, setNoteText] = useState("");
    const [stickyNote, setStickyNote] = useState(false);
    
    const queryClient = useQueryClient();
    const { movement } = useMovement();
    const { historyDate } = useDate();

    const newNoteMutation = useMutation({
        mutationFn: addNewNote,
        onSuccess: onSaveSuccess
    });
    const editNoteMutation = useMutation({
        mutationFn: editNote,
        onSuccess: onSaveSuccess
    })

    function onSaveSuccess() {
        queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
        onCancel();
        setNoteText("");
        setStickyNote(false);
    }

    function changeNoteText(e: ChangeEvent<HTMLTextAreaElement>) {
        setNoteText(e.target.value);
    }

    function handleSave(e: SyntheticEvent) {
        e.preventDefault();
        
        if (noteText.length > 0 && movement != "") {
            if (noteid) {
                editNoteMutation.mutate({ noteid: noteid, text: noteText, sticky: stickyNote })
            } else {
                newNoteMutation.mutate({ movement: movement, text: noteText, sticky: stickyNote, date: historyDate.toDateString()});
            }
            
        }
    }

    function closeMenu() {
        setStickyNote(false)
        setNoteText("");
        onCancel();
    }

    useEffect(() => {
        if (text) {
            setNoteText(text)
        }
        if (sticky) {
            setStickyNote(sticky)
        }
    }, [noteid])
    
    return (
        <PopupMenu
            title="Add Note"
            onSubmit={handleSave}
            onCancel={closeMenu}
        >
            <form className="addNoteForm">
                <textarea 
                    className="longTextInput noteTextBox" 
                    id="noteInput" 
                    value={noteText} 
                    onChange={changeNoteText}
                />
                <br />
                <div data-tooltip-id="sticky" style={{marginTop: "0.5rem"}}>
                    <ToggleSwitch  
                        onChange={() => setStickyNote(!stickyNote)} 
                        label="Sticky"
                        initialState={stickyNote}
                    />
                </div>
                <Tooltip id="sticky" place="top" content={tooltipText} className="niceTooltip"/>
            </form>
        </PopupMenu>
    )
}

export default NoteMenu;