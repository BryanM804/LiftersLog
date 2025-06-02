import "../../features/logging/logging.css";
import RecentHistory from "../../features/logging/components/RecentHistory";
import NoteSection from "../../features/logging/components/NoteSection";
import AuthChecker from "../../components/AuthChecker";
import LogMenu from "../../features/logging/components/LogMenu";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useState } from "react";
import CardioMenu from "../../features/logging/components/CardioMenu";
import useSwipe from "../../hooks/useSwipe";
import { isDesktop } from "react-device-detect";
import { motion, AnimatePresence } from "framer-motion"
import FadePopup from "../../components/FadePopup";

function LogScreen() {
    return (
        <>
            <FadePopup text="Lifts" />
            <LogMenu />
            <NoteSection />
            <RecentHistory />
        </>
    )
}

function CardioScreen () {
    return (
        <>
            <FadePopup text="Cardio" />
            <CardioMenu />
            <RecentHistory />
        </>
    )
}

const screens = [<LogScreen />, <CardioScreen />]

function Logging() {

    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1) // 1 for right, -1 for left

    const { swiping } = useSwipe({
        onSwipeLeft: () => {
            setIndex(1)
            setDirection(-1)
        },
        onSwipeRight: () => {
            setIndex(0)
            setDirection(1)
        }
    })

    function handleDesktopSwitchChange() {
        setIndex(index == 1 ? 0 : 1)
        setDirection(direction == 1 ? -1 : 1)
    }

    return (
        <>
        <AuthChecker />
        <AnimatePresence>
            <motion.div
                key={index}
                initial={{ opacity: 0, position: "fixed" }}
                animate={{ x: 0, opacity: 1, position: "relative"}}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0, position: "fixed"}}
                transition={{ duration: 0.2 }}
                className="mainContentPane"
            >
                {
                    isDesktop && 
                    <div style={{margin: "0.5rem", alignSelf: "start"}}>
                        <ToggleSwitch offLabel="Lift" onLabel="Cardio" 
                        onChange={handleDesktopSwitchChange}
                        type="dark"
                        initialState={index == 1}
                        />
                    </div>
                    // This reloads on every switch so initialState is really just the state
                }
                {
                    screens[index]
                }
            </motion.div>
        </AnimatePresence>
        </>
    )
}

export default Logging;