import MovementGraph from "./MovementGraph";
import "../insights.css"
import MovementPicker from "../../logging/components/MovementPicker";
import { useMovement } from "../../logging/contexts/MovementContextProvider";
import HalfGap from "../../../components/HalfGap";
import { useEffect, useState } from "react";
import ItemPicker from "../../../components/ItemPicker";
import MovementInsights from "./MovementInsights";
import UserInsights from "./UserInsights";
import SectionTitle from "../../../components/SectionTitle";
import useDebounce from "../../../hooks/useDebounce";

const movementTimeframes = ["All", "Recent", "Today"]
const userTimeframes = ["All", "Recent", "Week"]
const metrics = ["Average", "Max", "Best"]

function Insights() {

    const { movement } = useMovement()
    const debouncedMovement = useDebounce(movement, 300)

    const [timeframe, setTimeframe] = useState("")
    const [metric, setMetric] = useState("")
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const storedTimeframe = localStorage.getItem("graphTimeframe")
        const storedMetric = localStorage.getItem("graphMetric")

        // Restore stored timeframe
        if (storedTimeframe) {
            if (movement != "" && movementTimeframes.includes(storedTimeframe)) {
                setTimeframe(storedTimeframe)
            } else if (movement == "" && userTimeframes.includes(storedTimeframe)) {
                setTimeframe(storedTimeframe)
            }
        } else {
            localStorage.setItem("graphTimeframe", timeframe)
        }

        // Restore stored metric
        if (storedMetric) {
            if (metrics.includes(storedMetric)) {
                setMetric(storedMetric)
            }
        } else {
            localStorage.setItem("graphMetric", metric)
        }

        // Need initialized because the debouncedMovement useEffect was overriding this 
        // since it was reading the states before they finished setting
        setInitialized(true)
    }, [])

    useEffect(() => {
        if (!initialized) return

        if (debouncedMovement != "") {
            if (timeframe === "" || timeframe === "Week") {
                setTimeframe("Recent")
                localStorage.setItem("graphTimeframe", "Recent")
            }
            if (metric === "") {
                setMetric("Average")
                localStorage.setItem("graphMetric", "Average")
            }
        } 
    }, [debouncedMovement])

    function changeMetric(newMetric: string) {
        localStorage.setItem("graphMetric", newMetric)
        setMetric(newMetric)
    }

    function changeTimeframe(newTimeframe: string) {
        localStorage.setItem("graphTimeframe", newTimeframe)
        setTimeframe(newTimeframe)
    }

    return (
        <>
        <div className="insightsContainer">
        <SectionTitle text="Insights" />
        <div className="insightPickerBar">
            <div className="insightMovementPickerContainer">
                <MovementPicker placeholder="Select Movement" className="insightMovementPicker" clearButtonClassName="insightClearButton"/>
            </div>
            <ItemPicker placeholder="Timeframe" options={debouncedMovement === "" ? userTimeframes : movementTimeframes} selected={timeframe} setSelected={changeTimeframe} />
            { debouncedMovement != "" && timeframe != "Today" && <ItemPicker placeholder="Metric" options={metrics} selected={metric} setSelected={changeMetric} /> }
        </div>
        <HalfGap />
        {
            movement != "" ?
                <>
                <MovementGraph 
                    movement={debouncedMovement}
                    timeframe={timeframe}
                    metric={metric}
                />
                <MovementInsights timeframe={timeframe} />
                </>
            :
                <>
                    <UserInsights timeframe={timeframe === "" ? "all" : timeframe} />
                </>
        }
        </div>
        </>
    )
}

export default Insights;