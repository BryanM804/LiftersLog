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
    const [subLineLabel, setSubLineLabel] = useState("Right Total")
    const [graphTitle, setGraphTitle] = useState("Average Weight Graph")
    const [isSplitGraph, setIsSplitGraph] = useState(false);

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
                if (isSplitGraph) {
                    setSubLineLabel("Median Right Total")
                    setLineLabel("Median Left Total")
                } else {
                    setLineLabel("Median Set Total")
                }
                setGraphTitle(`${graphPrefix} Average ${movement}`)
                break
            case "Max":
                if (isSplitGraph) {
                    setSubLineLabel("Max Right Weight")
                    setLineLabel("Max Left Weight")
                } else {
                    setLineLabel("Max Weight")
                }
                setGraphTitle(`${graphPrefix} Max ${movement}`)
                break
            case "Best":
                if (isSplitGraph) {
                    setSubLineLabel("Best Right Total")
                    setLineLabel("Best Left Total")
                } else {
                    setLineLabel("Best Set Total")
                }
                setGraphTitle(`${graphPrefix} Best ${movement}`)
                break
        }
    }, [metric, timeframe, movement, isSplitGraph]) // This movement is debounced before it is sent here

    const { data, isLoading, error } = useQuery({
        queryKey: ["graph", movement, timeframe, metric],
        queryFn: getGraphData
    })

    useEffect(() => {
        if (data) {
            const match = data.find((graphPoint: {date: string, value: number, subValue?: number}) => graphPoint.subValue != null && graphPoint.subValue != 0)
            if (match) {
                setIsSplitGraph(true)
            } else {
                setIsSplitGraph(false)
            }
        }
    }, [data])

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
                        stroke={ isSplitGraph ? "#f03030" : "#5ba5f0"}
                        strokeWidth={2}
                        dot={false}
                    />
                    {
                        isSplitGraph &&
                        <Line
                            name={subLineLabel}
                            dataKey="subValue"
                            type="natural"
                            strokeWidth={2}
                            stroke="#309eff"
                            dot={false}
                        />
                    }
                    {
                        timeframe === "Today" &&
                        <>
                        <Line 
                            name={ isSplitGraph ? "Recent Left Performance" : "Recent Performance" }
                            dataKey="baseline"
                            type="natural"
                            strokeWidth={2}
                            stroke={ isSplitGraph ? "#961e1e" : "#647087" }
                            dot={false}
                        />
                        {
                            isSplitGraph &&
                            <Line 
                                name="Recent Right Performance"
                                dataKey="subBaseline"
                                type="natural"
                                strokeWidth={2}
                                stroke="#1c5a91"
                                dot={false}
                            />
                        }
                        </>
                    }
                </LineChart>
            </ResponsiveContainer>
        </div>
        </>
    )
}

export default MovementGraph