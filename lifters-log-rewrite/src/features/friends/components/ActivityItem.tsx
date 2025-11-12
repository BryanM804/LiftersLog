import { useEffect, useState } from "react";
import useHoverTouch from "../../../hooks/useHoverTouch";
import { motion, useMotionValue } from "framer-motion";
import { useReplying } from "../../chat/contexts/ChatReplyContext";

type ActivityItemProps = {
    id: number;
    username: string;
    date: string;
    time: string;
    exercise: string;
    weight?: number;
    subWeight?: number;
    reps?: number;
    subReps?: number;
    note?: string;
    label?: string;
    cardiotime?: number;
    distance?: number;
    cardionote?: string;
}

function ActivityItem({ id, username, date, time, exercise, weight, subWeight, reps, subReps, note, label, cardiotime, distance, cardionote }: ActivityItemProps) {

    // Should always either have a weight and reps, note, or label as non null values

    // Today ones should show time, recent should show date

    const { setReplyingId, setReplyingText, setReplyType, setOriginalUser } = useReplying();

    const { isHovering, hoverHandlers } = useHoverTouch();
    const [showTime, setShowTime] = useState(true)
    const x = useMotionValue(0);

    let title: string = "";
    let body;
    let activityType: "lift" | "label" | "note" | "cardio";
    let activityClass;
    let replyingText = "";

    if (weight && reps) {
        title = `${username} logged ${exercise}`
        body = (
            <>
                <li className="activityNote">{ subWeight && subReps ? "L: " : "" }{weight}lbs for {reps} reps</li>
                {
                    subWeight && subReps ? <li className="activityNote">R: {weight}lbs for {reps} reps</li>
                    :
                    <></>
                }
            </>
        );
        activityType = "lift"
        activityClass = "logActivity"
        replyingText = `${title}: ${ subWeight ? "L: " : "" }${weight}lbs for ${reps} reps${subWeight ? ` R: ${weight}lbs for ${reps} reps` : ""}`
    } else if (note) {
        title = `${username} added a note to ${exercise}`
        body = (
            <li className="activityNote">"{note}"</li>
        )
        activityType = "note"
        activityClass = "noteActivity"
        replyingText = `${title}: ${note}`
    } else if (label) {
        title = `${username} set a label for ${date}`
        body = (
            <li className="activityNote">"{label}"</li>
        )
        activityType = "label"
        activityClass = "labelActivity"
        replyingText = `${title}: ${label}`
    } else if (cardiotime) {
        title = `${username} logged ${exercise}`
        body = (
            <>
                <li className="activityNote">{cardiotime} minutes{ distance && `, ${distance} miles` }</li>
                {
                    cardionote &&
                    <li className="activityNote">{cardionote}</li>
                }
            </>
        )
        activityType = "cardio"
        activityClass = "cardioActivity"
        replyingText = `${title}: ${cardiotime} minutes${ distance && `, ${distance} miles`}`
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
    
    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setShowTime(today == date);
    }, [])

    function setActiveReply() {
        setReplyingId(id);
        setReplyingText(replyingText);
        setReplyType(activityType)
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
                [{showTime ? time : date}]
            </div>
            {title}
            <ul style={{paddingLeft: "1rem"}}>
                {body}   
            </ul>
        </motion.li>
    )
}

export default ActivityItem