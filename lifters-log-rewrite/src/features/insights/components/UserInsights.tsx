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
        queryFn: getUserInsights,
        enabled: false
    })

    // if (isLoading) return <Loading />
    // if (error) return <ServerError error={error} />

    return (
        <>
            <div>
                <h5 style={{marginTop: "2.75rem", marginBottom: "0"}}>{authUser.username}</h5>
                <hr className="darkFont"/>
            </div>
            <UserMuscleGroupChart timeframe={timeframe}/>
            <div className="statSection">
                <StatCard title="Average Sets/Week" value="50" />
            </div>
        </>
    )
}

export default UserInsights