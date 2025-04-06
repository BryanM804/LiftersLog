import { useEffect, useState } from "react";
import useHoverTouch from "../../../hooks/useHoverTouch";

type ActivityItemProps = {
    username: string;
    date: string;
    time: string;
    exercise: string;
    weight?: number;
    reps?: number;
    note?: string;
    label?: string;
}

function ActivityItem({ username, date, time, exercise, weight, reps, note, label }: ActivityItemProps) {

    // Should always either have a weight and reps, note, or label as non null values

    // Today ones should show time, recent should show date

    const { isHovering, hoverHandlers } = useHoverTouch();
    const [showTime, setShowTime] = useState(true)
    
    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setShowTime(today == date);
    }, [])

    if (weight && reps) {
        return (
            <li className="activityItem logActivity" {...hoverHandlers}>
                <div className={`activityItemHover smallText ${isHovering ? "" : "hidden"}`}>
                    [{showTime ? time : date}]
                </div>
                {username} logged {exercise}
                <ul style={{paddingLeft: "1rem"}}>
                    <li className="activityNote">{weight}lbs for {reps} reps</li>
                </ul>
            </li>
        )
    }

    if (note) {
        return (
            <li className="activityItem noteActivity" {...hoverHandlers}>
                <div className={`activityItemHover smallText ${isHovering ? "" : "hidden"}`}>
                    [{showTime ? time : date}]
                </div>
                {username} added a note to {exercise}
                <ul style={{paddingLeft: "1rem"}}>
                    <li className="activityNote">"{note}"</li>
                </ul>
            </li>
        )
    }

    if (label) {
        return (
            <li className="activityItem labelActivity" {...hoverHandlers}>
                <div className={`activityItemHover smallText ${isHovering ? "" : "hidden"}`}>
                    [{showTime ? time : date}]
                </div>
                {username} set label for {date}
                <ul style={{paddingLeft: "1rem"}}>
                    <li className="activityNote">"{label}"</li>
                </ul>
            </li>
        )
    }
    
    return (<></>)
}

export default ActivityItem