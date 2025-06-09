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

    useEffect(() => {
        if (debouncedMovement != "") {
            if (timeframe == "") setTimeframe("Recent")
            if (metric == "") setMetric("Average")
        } else if (timeframe == "" || timeframe == "Week") {
            setTimeframe("Recent")
        }
    }, [debouncedMovement])

    return (
        <>
        <div className="insightsContainer">
        <SectionTitle text="Insights" />
        <div className="insightPickerBar">
            <div className="insightMovementPickerContainer">
                <MovementPicker placeholder="Select Movement" className="insightMovementPicker" clearButtonClassName="insightClearButton"/>
            </div>
            <ItemPicker placeholder="Timeframe" options={debouncedMovement === "" ? userTimeframes : movementTimeframes} selected={timeframe} setSelected={setTimeframe} />
            { debouncedMovement != "" && timeframe != "Today" && <ItemPicker placeholder="Metric" options={metrics} selected={metric} setSelected={setMetric} /> }
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
                <MovementInsights />
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