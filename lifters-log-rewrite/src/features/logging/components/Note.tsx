import DeleteButton from "../../../components/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteNote from "../api/deleteNote";
import useHoverTouch from "../../../hooks/useHoverTouch";
import useLongPress from "../../../hooks/useLongPress";
import { isMobile } from "react-device-detect";
import { useState } from "react";
import PopupMenu from "../../../components/PopupMenu";
import NoteMenu from "./NoteMenu";


type NoteProps = {
    text: string;
    noteid: number;
    sticky: boolean;
}

function Note({ text, noteid, sticky }: NoteProps) {

    const [deleting, setDeleting] = useState(false);
    const [editing, setEditing] = useState(false);

    const { isHovering, hoverHandlers } = useHoverTouch();
    const { holdHandlers } = useLongPress(() => {setDeleting(true)});
    const queryClient = useQueryClient();

    const handlers = isMobile ? holdHandlers : hoverHandlers;

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            // Refresh notes when note is removed
            queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
        }
    })

    function handleDelete() {
        deleteMutation.mutate(noteid);
    }

    function handleEdit() {
        setDeleting(false);
        setEditing(true);
    }

    return (
        <>
            <div className="note" {...handlers}>
                <li>
                    {text}
                    {
                        isMobile ?
                            deleting && 
                            <PopupMenu
                                title="Change Note"
                                onSubmit={handleDelete}
                                confirmButtonText="Delete"
                                onCancel={() => setDeleting(false)}
                                buttonChildren={
                                    <button 
                                        className="floatingButton"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                }
                            >
                                <p>Would you like to change this note?</p>
                                <p style={{marginLeft: "1rem", fontStyle: "italic"}}>{text}</p>
                            </PopupMenu>
                        :
                            <DeleteButton show={isHovering} onDelete={handleDelete}/>
                    }
                </li>
            </div>
            {
                editing &&
                <NoteMenu noteid={noteid} text={text} sticky={sticky} onCancel={() => setEditing(false)}/>
            }
        </>
    )
}

export default Note;