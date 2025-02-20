import { useState } from "react";

type DeleteButtonProps = {
    show: boolean;
    onDelete: VoidFunction;
}

function DeleteButton({ show, onDelete }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

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
                <div className="deleteButton confirmationBox">
                    <div className="confirmationText">Are you sure?</div>
                    <button className="smallFloatingButton" onClick={onDelete}>✅</button>
                    <button className="smallFloatingButton" onClick={() => setIsDeleting(false)}>❌</button>
                </div>
        }
        </>
    )
}

export default DeleteButton;