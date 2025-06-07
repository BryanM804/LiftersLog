
// const LogButton = forwardRef<HTMLInputElement, LogButtonProps>(({ isSplit, onLogSuccess }, ref) => {

type LogButtonProps = {
    invalidLog: boolean;
}

function LogButton({ invalidLog }: LogButtonProps) {

    return (
        <div style={{textAlign: "center"}} className="gridItemSpan">
            <button 
                type="submit" 
                className={invalidLog ? "floatingButton redButton" : "floatingButton"} 
                style={{width: "75%", zIndex: 1, position: "relative"}}
                id="logButton"
            >Log</button>
        </div>
    )
}

export default LogButton;