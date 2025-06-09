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
            <div className="confirmationText">{showText}</div>
            <button className="smallFloatingButton smallMenuButton" onClick={confirmFn}>✅</button>
            <button className="smallFloatingButton smallMenuButton" onClick={cancelFn}>❌</button>
        </div>
        </>
    )
}

export default ConfirmationBox;