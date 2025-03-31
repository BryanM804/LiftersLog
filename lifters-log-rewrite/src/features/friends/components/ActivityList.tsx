import { useQuery } from "@tanstack/react-query"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import getFriendActivity from "../api/getFriendActivity"
import ActivityEntry from "../types/ActivityEntry"
import { useEffect, useState } from "react"
import ActivityItem from "./ActivityItem"

type ActivityListProps = {
    timeframe: string;
}

function ActivityList({ timeframe }: ActivityListProps) {

    const [noActivity, setNoActivity] = useState(true)

    const { data, error, isLoading } = useQuery({
        queryKey: ["activity", timeframe],
        queryFn: () => getFriendActivity(timeframe),
        refetchInterval: 5000
    })

    useEffect(() => {
        if (data) console.log(data)

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
            <div className="darkFont">No activity</div>
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
                        date={entry.date}
                    />
                )
            }
            </ul>
        </div>
    )
}

export default ActivityList