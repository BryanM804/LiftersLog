import { useState } from "react";
import TimeSubtext from "../../../components/TimeSubtext";

type ChatMessageProps = {
    msg: string;
    author: string;
    time: string;
    date: string;
}

function ChatMessage({ msg, author, time, date }: ChatMessageProps) {

    const [hovering, setHovering] = useState(false)

    const today = new Date()
    const messageDate = new Date(Date.parse(date + "T00:00:00"))
    // Date.parse() parses UTC strings then converts them to your timezone which can mess up dates
    // Adding a time makes it parse it in local time

    return (
        <>
        <li className="chatMessage" onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
            {
                hovering &&
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