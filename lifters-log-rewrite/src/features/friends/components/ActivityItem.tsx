
type ActivityItemProps = {
    username: string;
    date?: string;
    exercise: string;
    weight?: number;
    reps?: number;
    note?: string;
}

function ActivityItem({ username, date, exercise, weight, reps, note }: ActivityItemProps) {

    // Should always either have a weight and reps or note

    // Today ones should show time, recent should show date

    if (weight && reps) {
        return (
            <li className="activityItem">
                - {username} logged {exercise}, {weight}lbs for {reps} reps
            </li>
        )
    }

    if (note) {
        return (
            <li className="activityItem">
                - {username} added a note to their {exercise}
                <ul>
                    <li className="smallText">{note}</li>
                </ul>
            </li>
        )
    }
    
    return (<></>)
}

export default ActivityItem