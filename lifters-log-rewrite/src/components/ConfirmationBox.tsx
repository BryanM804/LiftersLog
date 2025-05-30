import { SyntheticEvent } from "react";

type ConfirmationBoxProps = {
    confirmFn: (e: SyntheticEvent) => void;
    cancelFn: () => void;
    className?: string;
    text?: string;
}

function ConfirmationBox({ confirmFn, cancelFn, className, text }: ConfirmationBoxProps) {

    const showText = text ? text : "Are you sure?" // Omni man

    return (
        <>
        <div className="backgroundDim" style={{zIndex: "100"}} onClick={cancelFn}></div>
        <div className={"confirmationBox " + className} style={{zIndex: "101"}}>
            <div className="confirmationText">{showText}</div>
            <button className="smallFloatingButton smallMenuButton" onClick={confirmFn}>✅</button>
            <button className="smallFloatingButton smallMenuButton" onClick={cancelFn}>❌</button>
        </div>
        </>
    )
}

export default ConfirmationBox;