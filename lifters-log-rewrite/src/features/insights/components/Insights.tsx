import MovementGraph from "./MovementGraph";
import "../insights.css"
import MovementPicker from "../../logging/components/MovementPicker";
import { useMovement } from "../../logging/contexts/MovementContextProvider";
import HalfGap from "../../../components/HalfGap";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import ItemPicker from "../../../components/ItemPicker";

const timeframes = ["All", "Recent", "Today"]
const metrics = ["Average", "Max", "Best"]

function Insights() {
    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

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
        <h3>Insights</h3>
        <hr />
        <div className="insightPickerBar">
            <div><MovementPicker placeholder="Select Movement" className="insightMovementPicker"/></div>
            <ItemPicker placeholder="Timeframe" options={timeframes} selected={timeframe} setSelected={setTimeframe} />
            <ItemPicker placeholder="Metric" options={metrics} selected={metric} setSelected={setMetric} />
        </div>
        <HalfGap />
        {
            movement != "" ?
                <>
                <div className="graphContainer">
                    <MovementGraph 
                        movement={movement}
                        timeframe={timeframe}
                        metric={metric}
                    />
                </div>
                <h5>{movement}</h5>
                </>
            :
                <>
                    <h4>{authUser.username}</h4>
                </>
        }
        </div>
        </>
    )
}

export default Insights;