import TimeSubtext from "../../../components/TimeSubtext";
import useHoverTouch from "../../../app/hooks/useHoverTouch";

type ChatMessageProps = {
    msg: string;
    author: string;
    time: string;
    date: string;
}

function ChatMessage({ msg, author, time, date }: ChatMessageProps) {

    const { isHovering, hoverHandlers } = useHoverTouch();

    const today = new Date()
    const messageDate = new Date(Date.parse(date + "T00:00:00"))
    // Date.parse() parses UTC strings then converts them to your timezone which can mess up dates
    // Adding a time makes it parse it in local time

    return (
        <>
        <li className="chatMessage" {...hoverHandlers}>
            {
                isHovering &&
                <TimeSubtext className="chatMessageTime">
                    { 
                        (today.getDay() != messageDate.getDay()) ?
                            time + " " + messageDate.toLocaleDateString()
                        :
                            time
                    }
                </TimeSubtext>
            }
            <span style={{fontWeight: "bold"}}>{author}</span>: {msg}
        </li>
        </>
    )
}

export default ChatMessage