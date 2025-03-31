import { SyntheticEvent, useState } from "react";
import ConfirmationBox from "./ConfirmationBox";

type DeleteButtonProps = {
    show: boolean;
    onDelete: VoidFunction;
}

function DeleteButton({ show, onDelete }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    function handleDelete(e: SyntheticEvent) {
        e.preventDefault();
        onDelete();
    }

    return (
        <>
        {   
            show && !isDeleting &&
                <div className="deleteButton">
                    <button className="smallFloatingButton" onClick={() => setIsDeleting(true)}>❌</button>
                </div>
        }
        {
            show && isDeleting &&
            <ConfirmationBox className="deleteButton" confirmFn={handleDelete} cancelFn={() => setIsDeleting(false)} />
        }
        </>
    )
}

export default DeleteButton;