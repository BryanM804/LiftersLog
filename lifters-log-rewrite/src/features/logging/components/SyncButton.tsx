import { SyntheticEvent } from "react";

type SyncButtonProps = {
    syncState: boolean;
    onSyncToggle: (e: SyntheticEvent) => void;
}

function SyncButton({ syncState, onSyncToggle }: SyncButtonProps) {

    return (
        <>
            <button
                className={`floatingButton ${syncState && "syncActive"}`}
                onClick={onSyncToggle}
                style={{
                    fontSize: "1.3rem", 
                    opacity: `${syncState ? "100%" : "75%"}`, 
                    border: `${syncState ? "" : "1px solid #555"}`,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)"
                }}
            >
                ↔
            </button>
        </>
    )
}

export default SyncButton