import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import TimeSubtext from "../../../components/TimeSubtext";
import useHoverTouch from "../../../hooks/useHoverTouch";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import { motion, PanInfo, useMotionValue } from "framer-motion";
import { useEffect } from "react";

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
    const x = useMotionValue(0);

    const isUsersMessage = author == authUser.username

    const today = new Date()
    const messageDate = new Date(Date.parse(date + "T00:00:00"))
    // Date.parse() parses UTC strings then converts them to your timezone which can mess up dates
    // Adding a time makes it parse it in local time

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
        setReplyingMessageId(cid)
        setReplyingMessageText(`${author}: ${msg}`)
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