
// const LogButton = forwardRef<HTMLInputElement, LogButtonProps>(({ isSplit, onLogSuccess }, ref) => {

type LogButtonProps = {
    invalidLog: boolean;
    className?: string;
}

function LogButton({ invalidLog, className }: LogButtonProps) {

    return (
        <div style={{textAlign: "center", width: "100%"}}>
            <button 
                type="submit" 
                className={`floatingButton ${invalidLog ? "redButton" : ""} ${className ? className : ""}`}
                style={{width: "75%", zIndex: 1, position: "relative"}}
                id="logButton"
            >Log</button>
        </div>
    )
}

export default LogButton;