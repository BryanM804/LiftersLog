import DeleteButton from "../../../components/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteNote from "../api/deleteNote";
import useHoverTouch from "../../../app/hooks/useHoverTouch";


type NoteProps = {
    text: string;
    noteid: number;
}

function Note({ text, noteid }: NoteProps) {

    const { isHovering, hoverHandlers } = useHoverTouch();
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
        <div className="note" {...hoverHandlers}>
            <li>
                {text}
                <DeleteButton show={isHovering} onDelete={handleDelete}/>
            </li>
        </div>
    )
}

export default Note;