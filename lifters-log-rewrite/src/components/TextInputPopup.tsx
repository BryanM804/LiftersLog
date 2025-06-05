import { ChangeEvent, SyntheticEvent, useState } from "react";

type TextInputPopupProps = {
    message: string;
    inputPlaceholder?: string;
    confirmFn: (s: string) => void;
    cancelFn: () => void;
}


function TextInputPopup({ message, inputPlaceholder, confirmFn, cancelFn }: TextInputPopupProps) {

    const [enteredText, setEnteredText] = useState("")

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        setEnteredText(e.target.value)
    }

    function handleConfirmation(e: SyntheticEvent) {
        e.preventDefault()
        confirmFn(enteredText)
    }

    return (
        <>
            <div className="backgroundDim" onClick={cancelFn}></div>
            <div className="textPopupMenu">
                {
                    message && <p style={{margin: "0", marginBottom: "0.5rem"}}>{message}</p>
                }
                <form onSubmit={handleConfirmation}>
                    <input type="text" value={enteredText} className="smallTextInput" onChange={handleTextChange} placeholder={ inputPlaceholder ? inputPlaceholder : ""} />
                    <div style={{display: "flex", gap: "0.3rem", justifyContent: "center"}} >
                        <button onClick={handleConfirmation} className="floatingButton menuButton">Confirm</button>
                        <button onClick={cancelFn} className="floatingButton menuButton">Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default TextInputPopup