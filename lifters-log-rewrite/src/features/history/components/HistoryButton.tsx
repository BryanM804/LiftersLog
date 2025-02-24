
type HistoryButtonProps = {
    direction: string;
    onClick: VoidFunction;
}

function HistoryButton({ direction, onClick }: HistoryButtonProps) {

    const extraClass = direction == "back" ? "leftHistoryButton" : "rightHistoryButton"

    return (
        <button className={"floatingButton " + extraClass} onClick={onClick}>
            {
                direction == "back" ?
                "<"
                :
                ">"
            }
        </button>
    )
}

export default HistoryButton;