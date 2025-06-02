import { useQuery } from "@tanstack/react-query"
import { useMovement } from "../../logging/contexts/MovementContextProvider"
import getMovementInsights from "../api/getMovementInsights"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"

function MovementInsights() {

    const { movement } = useMovement()

    const { data, isLoading, error } = useQuery({
        queryKey: ["insights", movement],
        queryFn: getMovementInsights
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error}/>

    return (
        <>
            <div style={{width: "100%", marginTop: "2.75rem"}}>
                <h5 style={{marginBottom: "0"}}>{movement}</h5>
                <hr className="darkFont"/>
            </div>
            {
                data.totalSets == 0 ?
                    <p className="darkFont" style={{width: "95%", alignSelf: "center"}}>Start logging some {movement} to see your stats!</p>
                :
                // This is all placeholder to get everything on the backend working
                <>
                    <p>Total sets | All time: {data.totalSets} This week: {data.currentFreq}</p>
                    <p>Best Set: {data.bestSet.weight} lbs x {data.bestSet.reps} reps on {data.bestSet.date}</p>
                    <p>Most Weight: {data.maxWeight} lbs | Most Reps: {data.maxReps}</p>
                    <p>Average Sets Per Week: {data.averageFreq}</p>
                </>
            }
        </>
    )
}

export default MovementInsights