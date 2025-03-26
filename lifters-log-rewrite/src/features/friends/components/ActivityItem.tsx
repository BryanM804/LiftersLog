
type ActivityItemProps = {
    username: string;
    type: string;
    exercise?: string;
    weight?: number;
    reps?: number;
    note?: string;
}

function ActivityItem({ username, type, exercise, weight, reps, note }: ActivityItemProps) {

    if (type === "lift") {
        return (
            <li className="activityItem">
                {username} logged {exercise}, {weight}lbs for {reps} reps
            </li>
        )
    }

    if (type === "note" && note && exercise) {
        return (
            <li className="activityItem">
                {username} added a note to their {exercise}
                <p className="subText">{note}</p>
            </li>
        )
    }
    
}

export default ActivityItem