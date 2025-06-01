import { useQuery } from "@tanstack/react-query";
import getGraphData from "../api/getGraphData";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

type MovementGraphProps = {
    movement: string;
    timeframe: string;
    metric: string;
}

function MovementGraph({ movement, timeframe, metric }: MovementGraphProps) {

    const [lineLabel, setLineLabel] = useState("Total")
    const [graphTitle, setGraphTitle] = useState("Average Weight Graph")

    useEffect(() => {
        let graphPrefix = ""
        switch(timeframe) {
            case "All":
                graphPrefix = "All Time"
                break
            case "Recent":
                graphPrefix = "Recent"
                break
            case "Today":
                graphPrefix = "Current"
                break
        }

        switch (metric) {
            case "Average":
                setLineLabel("Average Set Total")
                setGraphTitle(`${graphPrefix} Average ${movement}`)
                break
            case "Max":
                setLineLabel("Max Weight")
                setGraphTitle(`${graphPrefix} Max ${movement}`)
                break
            case "Best":
                setLineLabel("Best Set Total")
                setGraphTitle(`${graphPrefix} Best ${movement}`)
                break
        }
    }, [metric, timeframe])

    const { data, isLoading, error } = useQuery({
        queryKey: ["graph", movement, timeframe, metric],
        queryFn: getGraphData
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <>
        <h4 style={{textAlign: "center"}}>{graphTitle}</h4>
        <ResponsiveContainer height="100%" width="100%">
            <LineChart 
                data={data}
            >
                <CartesianGrid vertical={false} />
                <XAxis 
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis 
                    dataKey="value"
                    tickMargin={8}
                />
                <Tooltip 
                    contentStyle={{backgroundColor: "#111"}}
                    formatter={(value) => `${value} lbs`}
                />
                <Legend />
                <Line
                    name={lineLabel}
                    dataKey="value"
                    type="natural"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
        </>
    )
}

export default MovementGraph