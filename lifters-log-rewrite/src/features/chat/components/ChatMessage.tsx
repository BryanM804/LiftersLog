import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import TimeSubtext from "../../../components/TimeSubtext";
import useHoverTouch from "../../../hooks/useHoverTouch";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useReplying } from "../contexts/ChatReplyContext";

type ChatMessageProps = {
    cid: number;
    msg: string;
    author: string;
    time: string;
    date: string;
    repliesTo?: {author: string, message: string, type: "note" | "lift" | "cardio" | "label" | "message" | undefined};
}

function ChatMessage({ cid, msg, author, time, date, repliesTo }: ChatMessageProps) {

    const { isHovering, hoverHandlers } = useHoverTouch();
    const { setReplyingId, setReplyingText, setReplyType, setOriginalUser } = useReplying();
    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;
    const x = useMotionValue(0);

    const isUsersMessage = author == authUser.username

    const today = new Date()
    const messageDate = new Date(Date.parse(date + "T00:00:00"))
    // Date.parse() parses UTC strings then converts them to your timezone which can mess up dates
    // Adding a time makes it parse it in local time

    let replyClass = "";
    if (repliesTo) {
        if (repliesTo.type === "note") {
            replyClass = "noteActivity"
        } else if (repliesTo.type === "lift") {
            replyClass = "logActivity"
        } else if (repliesTo.type === "cardio") {
            replyClass = "cardioActivity"
        } else if (repliesTo.type === "label") {
            replyClass = "labelActivity"
        }
    }

    useEffect(() => {
        const unsubscribe = x.on("change", (latest) => {
            if (latest < 0)
                x.set(0)
            else if (latest > 50)
                x.set(50)
        })

        return unsubscribe
    }, [x])

    function setActiveReply() {
        setReplyingId(cid)
        setReplyingText(`${author}: ${msg}`)
        setReplyType("message")
        setOriginalUser(author)
    }

    return (
        <>
        <motion.li 
            className={`chatMessage ${isUsersMessage ? "userChatMessage" : ""}`} 
            {...hoverHandlers}
            style={{ x }}
            drag={ isUsersMessage ? false : "x" }
            dragConstraints={{ left: 0, right: 0 }}
            dragDirectionLock={true}
            onDragEnd={(_, info) => { if (info.offset.x > 50) setActiveReply()}}
        >
            <span style={{fontWeight: "bold"}}>{author}</span>
            {
                repliesTo &&
                    <div className={`repliedMessage ${isUsersMessage ? "userRepliedMessage" : ""} ${replyClass != "" && replyClass}`}>
                        <span style={{fontWeight: "bold"}}>{repliesTo.author}</span>
                        <br />
                        <div style={{
                            whiteSpace: "pre-wrap", 
                            paddingLeft: `${repliesTo.type != "message" ? "1rem" : "0"}`,
                            fontStyle:  `${repliesTo.type != "message" ? "italic" : "normal"}`
                            }}>
                            {repliesTo.message}
                        </div>
                    </div>
            }
            <div
                style={{paddingLeft: "0.3rem"}}
            >
                {msg}
            </div>
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
        </motion.li>
        </>
    )
}

export default ChatMessage