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
    repliesTo?: {author: string, message: string};
    setReplyingMessageId: (rid: number) => void;
    setReplyingMessageText: (text: string) => void;
}

function ChatMessage({ cid, msg, author, time, date, repliesTo, setReplyingMessageId, setReplyingMessageText }: ChatMessageProps) {

    const { isHovering, hoverHandlers } = useHoverTouch();

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    const isUsersMessage = author == authUser.username

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
        <li className={`chatMessage ${isUsersMessage ? "userChatMessage" : ""}`} {...hoverHandlers}>
            <span style={{fontWeight: "bold"}}>{author}</span>
            {
                repliesTo &&
                    <div className={`repliedMessage ${isUsersMessage ? "userRepliedMessage" : ""}`}>
                        <span style={{fontWeight: "bold"}}>{repliesTo.author}</span>
                        <br />
                        {repliesTo.message}
                    </div>
            }
            <div
                style={{paddingLeft: "0.3rem"}}
            >
                {msg}
            </div>
            {
                !isUsersMessage &&
                    <button
                        className="replyButton"
                        onClick={setActiveReply}
                    >
                        Reply
                    </button>
            }
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
        </li>
        </>
    )
}

export default ChatMessage