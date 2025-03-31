import { SyntheticEvent } from "react";

type ConfirmationBoxProps = {
    confirmFn: (e: SyntheticEvent) => void;
    cancelFn: () => void;
    className?: string;
}

function ConfirmationBox({ confirmFn, cancelFn, className }: ConfirmationBoxProps) {

    return (
        <div className={"confirmationBox " + className}>
            <div className="confirmationText">Are you sure?</div>
            <button className="smallFloatingButton" onClick={confirmFn}>✅</button>
            <button className="smallFloatingButton" onClick={cancelFn}>❌</button>
        </div>
    )
}

export default ConfirmationBox;