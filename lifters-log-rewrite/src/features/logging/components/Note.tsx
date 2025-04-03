import DeleteButton from "../../../components/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteNote from "../api/deleteNote";
import useHoverTouch from "../../../app/hooks/useHoverTouch";
import useLongPress from "../../../app/hooks/useLongPress";
import { isMobile } from "react-device-detect";
import { useState } from "react";
import ConfirmationBox from "../../../components/ConfirmationBox";


type NoteProps = {
    text: string;
    noteid: number;
}

function Note({ text, noteid }: NoteProps) {

    const [deleting, setDeleting] = useState(false);

    const { isHovering, hoverHandlers } = useHoverTouch();
    const { isHeld, holdHandlers } = useLongPress(() => {setDeleting(true)});
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

    return (
        <div className="note" {...handlers}>
            <li>
                {text}
                {
                    isMobile ?
                        deleting && 
                        <ConfirmationBox text="Delete this note?" 
                            confirmFn={handleDelete}
                            cancelFn={() => setDeleting(false)}
                            />
                    :
                        <DeleteButton show={isHovering} onDelete={handleDelete}/>
                }
            </li>
        </div>
    )
}

export default Note;