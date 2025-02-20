
type HistoryButtonProps = {
    direction: string;
    onClick: VoidFunction;
}

function HistoryButton({ direction, onClick }: HistoryButtonProps) {

    return (
        <button className="floatingButton" onClick={onClick}>
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