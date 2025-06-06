import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { PLACEHOLDERUSERDATA } from "../../../utils/constants"
import UserData from "../../../types/UserData"
import { useQuery } from "@tanstack/react-query"
import getUserInsights from "../api/getUserInsights"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import UserMuscleGroupChart from "./UserMuscleGroupChart"
import StatCard from "./StatCard"

type UserInsightsProps = {
    timeframe: string;
}

function UserInsights({ timeframe }: UserInsightsProps) {
    
    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA

    const { data, isLoading, error } = useQuery({
        queryKey: ["insights", timeframe],
        queryFn: getUserInsights
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <>
            <div>
                <h5 style={{marginTop: "2.75rem", marginBottom: "0"}}>{authUser.username}</h5>
                <hr className="darkFont"/>
            </div>
            <UserMuscleGroupChart timeframe={timeframe}/>
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