import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import TimeSubtext from "../../../components/TimeSubtext";
import useHoverTouch from "../../../hooks/useHoverTouch";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";

type ChatMessageProps = {
    cid: number;
    msg: string;
    author: string;
    time: string;
    date: string;
    repliesTo?: string;
    setReplyingMessageId: (rid: number) => void;
    setReplyingMessageText: (text: string) => void;
}

function ChatMessage({ cid, msg, author, time, date, repliesTo, setReplyingMessageId, setReplyingMessageText }: ChatMessageProps) {

    const { isHovering, hoverHandlers } = useHoverTouch();

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    const today = new Date()
    const messageDate = new Date(Date.parse(date + "T00:00:00"))
    // Date.parse() parses UTC strings then converts them to your timezone which can mess up dates
    // Adding a time makes it parse it in local time

    function setActiveReply() {
        setReplyingMessageId(cid)
        setReplyingMessageText(`${author}: ${msg}`)
    }

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
            {
                repliesTo &&
                    <p>"{repliesTo}"</p>
            }
            <span style={{fontWeight: "bold"}}>{author}</span>: {msg}
            {
                author != authUser.username &&
                    <button
                        onClick={setActiveReply}
                    >
                        Reply
                    </button>
            }
        </li>
        </>
    )
}

export default ChatMessage