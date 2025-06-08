import { motion } from "framer-motion"
import { XPBAR_ANIMATION_TIME } from "../utils/constants";
import useHoverTouch from "../hooks/useHoverTouch";

type XpBarProps = {
    value: number;
    newValue?: number;
    max: number;
}

function XpBar({ value, newValue, max }: XpBarProps) {

    const { isHovering, hoverHandlers } = useHoverTouch()

    if (!newValue || value == newValue) {
        return (
            <>
                <div className="xpGutter" {...hoverHandlers}>
                    <div style={{position: "relative"}}>
                        <div
                            className="xpTooltip"
                            style={{ visibility: isHovering ? "visible" : "hidden"}}
                        >{value}/{max}</div>
                    </div>
                    <div className="xpBar" style={{ width: `${(value / max) * 100}%`}}></div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="xpGutter">
                <motion.div 
                    className="xpBar" style={{ width: `${(value / max) * 100}%`}}
                    initial={{width: `${(value / max) * 100}%`}}
                    animate={{width: `${(newValue / max) * 100}%`}}
                    transition={{duration: XPBAR_ANIMATION_TIME}}
                >
                </motion.div>
            </div>
        </>
    )
}

export default XpBar;