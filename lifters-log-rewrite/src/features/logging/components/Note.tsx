import { useState } from "react";
import DeleteButton from "../../../components/DeleteButton";


type NoteProps = {
    text: string;
}

function Note({ text }: NoteProps) {

    const [hovering, setHovering] = useState(false);

    function handleDelete() {
        
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