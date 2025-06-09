import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { PLACEHOLDERUSERDATA } from "../../../utils/constants"
import UserData from "../../../types/UserData"
import { useQuery } from "@tanstack/react-query"
import getUserInsights from "../api/getUserInsights"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import UserMuscleGroupChart from "./UserMuscleGroupChart"
import StatCard from "./StatCard"
import { useEffect, useState } from "react"

type UserInsightsProps = {
    timeframe: string;
}

function UserInsights({ timeframe }: UserInsightsProps) {
    
    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA

    const [hasData, setHasData] = useState(true)

    const { data, isLoading, error } = useQuery({
        queryKey: ["insights", timeframe],
        queryFn: getUserInsights
    })

    useEffect(() => {
        if (!data) {
            setHasData(false)
        } else {
            setHasData(true)
        }
    }, [data])

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <>
            <div>
                <h5 style={{marginTop: "2.75rem", marginBottom: "0"}}>{authUser.username}</h5>
                <hr className="darkFont"/>
            </div>
            {
                hasData ? <UserMuscleGroupChart timeframe={timeframe}/> : <p className="darkFont" style={{width: "95%", alignSelf: "center"}}>Start logging to see your set distribution across muscle groups and other stats!</p>
            }
            <div className="statSection">
                {
                    data && data.length &&
                    data.map((card: {title: string, value: string}) =>
                        <StatCard title={card.title} value={card.value} key={card.title}/>
                    )
                }
            </div>
        </>
    )
}

export default UserInsights