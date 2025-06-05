import { SyntheticEvent, useState } from "react";
import ConfirmationBox from "./ConfirmationBox";

type DeleteButtonProps = {
    show: boolean;
    onDelete: VoidFunction;
    confirmationMessage?: string;
}

function DeleteButton({ show, onDelete, confirmationMessage }: DeleteButtonProps) {
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
                    <button className="smallFloatingButton transparentButton" onClick={() => setIsDeleting(true)}>❌</button>
                </div>
        }
        {
            show && isDeleting &&
            <ConfirmationBox className="deleteButton" confirmFn={handleDelete} cancelFn={() => setIsDeleting(false)} text={confirmationMessage}/>
        }
        </>
    )
}

export default DeleteButton;