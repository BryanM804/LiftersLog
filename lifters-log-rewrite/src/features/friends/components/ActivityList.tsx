import { useQuery } from "@tanstack/react-query"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import getFriendActivity from "../api/getFriendActivity"
import ActivityItem from "./ActivityItem"
import Lift from "../../../types/Lift"
import Note from "../../../types/Note"
import { useEffect, useState } from "react"

type ActivityListProps = {
    timeframe: string;
}

function ActivityList({ timeframe }: ActivityListProps) {

    const [noActivity, setNoActivity] = useState(false)

    const { data, error, isLoading } = useQuery({
        queryKey: ["activity", timeframe],
        queryFn: () => getFriendActivity(timeframe)
    })

    useEffect(() => {
        if (data && data.length > 0) {
            let hadActivity = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].lifts || data[i].notes) {
                    setNoActivity(false);
                    hadActivity = true;
                    break;
                } 
            }
            if (!hadActivity) {
                // Can't check the actual state
                setNoActivity(true)
            }
        }
    }, [data])

    if (isLoading) 
        return <Loading></Loading>
    if (error) 
        return <ServerError error={error}></ServerError>

    if (noActivity) {
        return (
            <>No activity</>
        )
    }

    return (
        <div className="activityContainer">
            <ul className="activityList">
            {
                data.map((activity: {username: string, lifts: Array<Lift>}) => {
                    return activity.lifts.map((lift: Lift) => 
                        <ActivityItem key={lift.setid} type="lift"
                            username={activity.username}
                            exercise={lift.movement}
                            weight={lift.weight}
                            reps={lift.reps}
                            />
                    )
                })
            }
            {
                data.map((activity: {username: string, notes: Array<Note>}) => {
                    return activity.notes.map((note: Note) =>
                        <ActivityItem key={note.noteid} type="note"
                            username={activity.username}
                            note={note.text}
                            exercise={note.movement}
                            />
                    )
                })
            }
            </ul>
        </div>
    )
}

export default ActivityList