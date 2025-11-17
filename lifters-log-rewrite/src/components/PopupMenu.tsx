import { ReactNode, SyntheticEvent } from "react";

type PopupMenuProps = {
    title?: string;
    text?: string;
    onSubmit: (e: SyntheticEvent) => void;
    onCancel: (e: SyntheticEvent) => void;
    confirmButtonText?: string;
    children: ReactNode;
    buttonChildren?: ReactNode;
}

function PopupMenu({ title, text, onSubmit, onCancel, confirmButtonText, children, buttonChildren }: PopupMenuProps) {

    return (
        <>
            <div className="backgroundDim" onClick={onCancel}></div>
            <div
                className="popupMenu"
            >
                {
                    title && <h3 style={{marginTop: 0}}>{title}<hr style={{marginBottom: "1rem", marginTop: 0, opacity: "75%"}}/></h3>
                }
                {
                    text && <p>{text}</p>
                }
                {children}
                <div style={{display: "flex", flexDirection: "row", gap: "3rem", justifySelf: "center", justifyContent: "space-between"}}>
                    <button
                        onClick={onCancel}
                        className="floatingButton"
                    >
                        Cancel
                    </button>
                    {buttonChildren && buttonChildren}
                    <button
                        onClick={onSubmit}
                        className="floatingButton confirmationButton"
                    >
                        { confirmButtonText ? confirmButtonText : "Save"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default PopupMenu