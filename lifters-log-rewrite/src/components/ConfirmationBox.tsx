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
            <p style={{whiteSpace: "pre-line"}}>{showText}</p>
            <div style={{display: "flex", flexDirection: "row", alignContent: "center", width: "100%", justifyContent: "space-between", gap: "0.5rem"}}>
                <button className="floatingButton" onClick={cancelFn}>Cancel</button>
                <button className="floatingButton confirmationButton" onClick={confirmFn}>Confirm</button>
            </div>
        </div>
        </>
    )
}

export default ConfirmationBox;