import { useQuery } from "@tanstack/react-query";
import { isMobile } from "react-device-detect";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import getUserGraphData from "../api/getUserGraphData";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import { useEffect, useState } from "react";

type UserMuscleGroupChartProps = {
    timeframe: string;
}

function UserMuscleGroupChart({ timeframe }: UserMuscleGroupChartProps) {

    const [formattedData, setFormattedData] = useState<{ avg: string, mgroup: string} | null>(null)

    const { data, isLoading, error } = useQuery({
        queryKey: ["insightsGraph", timeframe],
        queryFn: getUserGraphData
    })

    // if (isLoading) return <Loading />
    // if (error) return <ServerError error={error} />

    // Shoulders MUST be first in the data or else it may get cut off on mobile
    // by being placed on the side of the chart instead of at the top

    // Capitalize first letter
    useEffect(() => {
        if (data) {
            setFormattedData(data.map((entry: {avg: string, mgroup: string}) => ({
                avg: parseFloat(entry.avg),
                mgroup: entry.mgroup.substring(0, 1).toUpperCase() + entry.mgroup.substring(1)
                })
            ))
        }
    }, [data])

    return (
        <div className="userChartContainer">
            <ResponsiveContainer width="100%" height="100%" >
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius={ isMobile ? "70%" : "80%"}
                    data={formattedData ? formattedData : data}
                >
                    <PolarGrid />
                    <PolarAngleAxis 
                        dataKey="mgroup"
                        tick={{fontSize: "0.75rem"}}
                    />
                    <PolarRadiusAxis 
                        tick={{fontSize: "0.6rem", opacity: "0.5"}}
                    />
                    <Radar
                        dataKey="avg"
                        stroke="#5b6af0"
                        strokeWidth={2}
                        fill="#5ba5f0"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default UserMuscleGroupChart;