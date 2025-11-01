import { CSSProperties, SyntheticEvent } from "react";

type ConfirmationBoxProps = {
    confirmFn: (e: SyntheticEvent) => void;
    cancelFn: () => void;
    className?: string;
    style?: CSSProperties;
    text?: string;
}

function ConfirmationBox({ confirmFn, cancelFn, className, text, style }: ConfirmationBoxProps) {

    const showText = text ? text : "Are you sure?" // Omni man

    return (
        <>
        <div className="backgroundDim" style={{zIndex: "100"}} onClick={cancelFn}></div>
        <div className={"confirmationBox " + className} style={style}>
            <p>{showText}</p>
            <div style={{display: "flex", flexDirection: "row"}}>
                <button className="smallFloatingButton confirmationButton" onClick={confirmFn}>Confirm</button>
                <button className="smallFloatingButton" onClick={cancelFn}>Cancel</button>
            </div>
        </div>
        </>
    )
}

export default ConfirmationBox;