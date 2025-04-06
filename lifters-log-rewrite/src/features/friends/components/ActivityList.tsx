import { useQuery } from "@tanstack/react-query"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import getFriendActivity from "../api/getFriendActivity"
import ActivityEntry from "../types/ActivityEntry"
import { useEffect, useState } from "react"
import ActivityItem from "./ActivityItem"

type ActivityListProps = {
    timeframe: string;
    friend: string;
    active: boolean;
}

function ActivityList({ timeframe, friend, active }: ActivityListProps) {

    const [noActivity, setNoActivity] = useState(true)

    const { data, error, isLoading } = useQuery({
        queryKey: ["activity", timeframe, friend],
        queryFn: () => getFriendActivity(timeframe, friend),
        refetchInterval: 5000,
        enabled: active
    })

    useEffect(() => {
        if (data && data.length > 0) {
            setNoActivity(false)
        }
    }, [data])

    if (isLoading) 
        return <Loading></Loading>
    if (error) 
        return <ServerError error={error}></ServerError>

    if (noActivity) {
        return (
            <div style={{opacity: "50%"}}>No activity</div>
        )
    }

    return (
        <div className="activityContainer">
            <ul className="activityList">
            {
                data.map((entry: ActivityEntry) => 
                    <ActivityItem key={entry.id} 
                        username={entry.username}
                        exercise={entry.movement}
                        weight={entry.weight}
                        reps={entry.reps}
                        note={entry.text}
                        label={entry.label}
                        date={entry.date}
                        time={entry.time}
                    />
                )
            }
            </ul>
        </div>
    )
}

export default ActivityList