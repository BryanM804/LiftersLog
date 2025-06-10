import { useQuery } from "@tanstack/react-query";
import getGraphData from "../api/getGraphData";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import FadePopup from "../../../components/FadePopup";

type MovementGraphProps = {
    movement: string;
    timeframe: string;
    metric: string;
}

// This doesn't use the movement context in case I want to use a static graph elsewhere at some point in time

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
                setLineLabel("Median Set Total")
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
    }, [metric, timeframe, movement]) // This movement is debounced before it is sent here

    const { data, isLoading, error } = useQuery({
        queryKey: ["graph", movement, timeframe, metric],
        queryFn: getGraphData
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    if (data && data.length < 2) {
        return (
            <>
                <FadePopup text="Not enough data to graph" duration={2} />
            </>
        )
    }

    return (
        <>
        <div className="graphContainer">
            <h4 style={{textAlign: "center", marginBottom: "0.25rem"}}>{graphTitle}</h4>
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
                        stroke="#5ba5f0"
                        strokeWidth={2}
                        dot={false}
                    />
                    {
                        timeframe === "Today" &&
                        <Line 
                            name="Recent Performance"
                            dataKey="baseline"
                            type="natural"
                            strokeWidth={2}
                            stroke="#647087"
                            dot={false}
                        />
                    }
                </LineChart>
            </ResponsiveContainer>
        </div>
        </>
    )
}

export default MovementGraph