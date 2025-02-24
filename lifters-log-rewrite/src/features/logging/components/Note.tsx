import { useState } from "react";
import DeleteButton from "../../../components/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteNote from "../api/deleteNote";


type NoteProps = {
    text: string;
    noteid: number;
}

function Note({ text, noteid }: NoteProps) {

    const [hovering, setHovering] = useState(false);
    const queryClient = useQueryClient();

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
        <div className="note" onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
            <li>
                {text}
                <DeleteButton show={hovering} onDelete={handleDelete}/>
            </li>
        </div>
    )
}

export default Note;