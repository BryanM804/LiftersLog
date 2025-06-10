import { useQuery } from "@tanstack/react-query"
import { useMovement } from "../../logging/contexts/MovementContextProvider"
import getMovementInsights from "../api/getMovementInsights"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import StatCard from "./StatCard"
import useDebounce from "../../../hooks/useDebounce"

type MovementInsightsProps = {
    timeframe: string;
}

function MovementInsights({ timeframe }: MovementInsightsProps) {

    const { movement } = useMovement()
    const debouncedMovement = useDebounce(movement, 300)

    const { data, isLoading, error } = useQuery({
        queryKey: ["insights", debouncedMovement, timeframe],
        queryFn: getMovementInsights,
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error}/>

    return (
        <>
            <div style={{width: "100%", marginTop: "2.75rem" }}>
                <h5 style={{marginBottom: "0"}}>{debouncedMovement}</h5>
                <hr className="darkFont"/>
            </div>
            {
                !data ?
                    <p className="darkFont" style={{width: "95%", alignSelf: "center"}}>Start logging some {movement} to see your stats!</p>
                :
                <div className="statSection">
                    {
                        data.map((stat: {title: string, value: string, subValue?: string}) => 
                            <StatCard key={stat.title} title={stat.title} value={stat.value} subValue={stat.subValue} />
                        )
                    }
                </div>
            }
        </>
    )
}

export default MovementInsights