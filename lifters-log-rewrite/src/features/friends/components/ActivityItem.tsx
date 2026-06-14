import { useEffect } from "react";
import useHoverTouch from "../../../hooks/useHoverTouch";
import { motion, useMotionValue } from "framer-motion";
import { useReplying } from "../../chat/contexts/ChatReplyContext";

type ActivityItemProps = {
    activity_id: number;
    ref_id: number;
    userid: number;
    username: string;
    type: "note" | "lift" | "cardio" | "label";
    title: string;
    subtitle: string;
    date: string;
    time: string;

}

function ActivityItem({ activity_id, username, time, type, title, subtitle }: ActivityItemProps) {

    // Today ones should show time, recent should show date

    const { setReplyingId, setReplyingText, setReplyType, setOriginalUser } = useReplying();

    const { isHovering, hoverHandlers } = useHoverTouch();
    const x = useMotionValue(0);

    let body;
    let activityClass;
    let replyingText = "";

    if (type === "lift") {
        if (subtitle.includes("\n")) {
            const subtitles = subtitle.split("\n")
            body = (
                <>
                    <li className="activityNote">{subtitles[0]}</li>
                    <li className="activityNote">{subtitles[1]}</li>
                </>
            )
        } else {
            body = (
                <li className="activityNote">{subtitle}</li>
            )
        }
        activityClass = "logActivity"
        replyingText = `${title}: ${subtitle}`
    } else if (type === "note") {
        body = (
            <li className="activityNote">{subtitle}</li>
        )
        activityClass = "noteActivity"
        replyingText = `${title}: ${subtitle}`
    } else if (type === "label") {
        body = (
            <li className="activityNote">{subtitle}</li>
        )
        activityClass = "labelActivity"
        replyingText = `${title}: ${subtitle}`
    } else if (type === "cardio") {
        body = (
            <li className="activityNote">{subtitle}</li>
        )
        activityClass = "cardioActivity"
        replyingText = `${title}: ${subtitle}`
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
        setReplyingId(activity_id);
        setReplyingText(replyingText);
        setReplyType(type)
        setOriginalUser(username)
    }

    return (
        <motion.li 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => { if (info.offset.x > 50) setActiveReply()}}
            style={{ x }}
            className={`activityItem ${activityClass}`} 
            {...hoverHandlers}
        >
            <div className={`activityItemHover smallText ${isHovering ? "" : "hidden"}`}>
                {time}
            </div>
            {title}
            <ul style={{paddingLeft: "1rem"}}>
                {body}   
            </ul>
        </motion.li>
    )
}

export default ActivityItem