import { useQuery } from "@tanstack/react-query"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import getFriendActivity from "../api/getFriendActivity"
import ActivityEntry from "../types/ActivityEntry"
import { useEffect, useState } from "react"
import ActivityItem from "./ActivityItem"

type ActivityListProps = {
    friend: string;
    active: boolean;
}

function ActivityList({ friend, active }: ActivityListProps) {

    const [noActivity, setNoActivity] = useState(true)

    const { data, error, isLoading } = useQuery({
        queryKey: ["activity", friend],
        queryFn: getFriendActivity,
        refetchInterval: 10000,
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
                data.map((entryGroup: {date: string, items: [ActivityEntry]}) => (
                    <div key={entryGroup.date}>
                        <h5 style={{margin: "0"}}>{entryGroup.date}</h5>
                        <hr />
                        {
                            entryGroup.items.map((entry: ActivityEntry) => 
                                <ActivityItem 
                                    activity_id={entry.activity_id}
                                    ref_id={entry.ref_id}
                                    userid={entry.userid}
                                    username={entry.username}
                                    type={entry.activity_type}
                                    title={entry.title}
                                    subtitle={entry.subtitle}
                                    date={entry.date}
                                    time={entry.time}
                                    key={entry.activity_id}
                                />
                            )
                        }
                    </div>
                ))
            }
            </ul>
        </div>
    )
}

export default ActivityList