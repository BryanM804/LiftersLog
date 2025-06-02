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

const timeframes = ["All", "Recent", "Today"]
const metrics = ["Average", "Max", "Best"]

function Insights() {

    const { movement, setMovement } = useMovement()

    const [timeframe, setTimeframe] = useState("")
    const [metric, setMetric] = useState("")

    useEffect(() => {
        if (movement) {
            if (timeframe == "") setTimeframe("Recent")
            if (metric == "") setMetric("Average")
        } else {
            setTimeframe("")
            setMetric("")
        }
    }, [movement])

    return (
        <>
        <div className="insightsContainer">
        <SectionTitle text="Insights" />
        <div className="insightPickerBar">
            <div><MovementPicker placeholder="Select Movement" className="insightMovementPicker"/></div>
            <ItemPicker placeholder="Timeframe" options={timeframes} selected={timeframe} setSelected={setTimeframe} />
            <ItemPicker placeholder="Metric" options={metrics} selected={metric} setSelected={setMetric} />
        </div>
        <HalfGap />
        {
            movement != "" ?
                <>
                <MovementGraph 
                    movement={movement}
                    timeframe={timeframe}
                    metric={metric}
                />
                <MovementInsights />
                </>
            :
                <>
                    <UserInsights />
                </>
        }
        </div>
        </>
    )
}

export default Insights;