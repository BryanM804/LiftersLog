import { ReactNode, useEffect, useRef, useState } from "react"
import useSwipe from "../../../hooks/useSwipe";
import useLongPress from "../../../hooks/useLongPress";
import LogMenu from "./LogMenu";
import { useMovement } from "../contexts/MovementContextProvider";
import FocusedSetHistory from "./FocusedSetHistory";
import FocusTimer from "./FocusTimer";
import { useAnimation, motion } from "framer-motion";

type FocusModeProps = {
    children: ReactNode;
}

function FocusMode({ children }: FocusModeProps) {

    const [focusModeEnabled, setFocusModeEnabled] = useState(false);
    const [width, setWidth] = useState(window.innerWidth)
    const [lastLogTime, setLastLogTime] = useState(0)
    const startAnimationRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const { reps, weight, setReps, setWeight } = useMovement()
    const { isHolding, holdHandlers } = useLongPress(() => setFocusModeEnabled(!focusModeEnabled), 2250);
    const {} = useSwipe({
        onSwipeUp: (x) => {
            if (!x || !focusModeEnabled) return

            if (x > (width / 2)) {
                // Right side
                setReps(reps + 1)
            } else {
                // Left side
                setWeight(weight + 5)
            }
        },
        onSwipeDown: (x) => {
            if (!x || !focusModeEnabled) return

            if (x > (width / 2)) {
                // Right side
                setReps(reps > 0 ? reps - 1 : reps)
            } else {
                // Left side
                setWeight(weight > 0 ? weight - 5 : weight)
            }
        }
    })
    const controls = useAnimation();

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        async function openingSequence() {
            for (let i = 0; i < 3; i++) {
                await controls.start({ boxShadow: "inset 0 0 75px rgba(0, 0, 0, 0.7)", transition: { duration: 0.5 } },)
                if (!isHolding) return
                await controls.start({ boxShadow: "none", transition: { duration: 0.5 }})
                if (!isHolding) return
            }
        }

        if (isHolding) {
            startAnimationRef.current = setTimeout(openingSequence, 250)
        } else {
            controls.stop()
            if (startAnimationRef.current) {
                clearTimeout(startAnimationRef.current)
                startAnimationRef.current = null
            }

            if (focusModeEnabled) {
                controls.set({ boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.7)" })
            } else {
                controls.set({ boxShadow: "none" })
            }
            
        }
    }, [isHolding])

    function handleLogSuccess() {
        setLastLogTime(Date.now());

        localStorage.setItem("latestTime", Date.now().toString())
    }

    return (
        <>
            <motion.div 
                className="focusModeContainer" 
                animate={controls}
                {...holdHandlers}
            >
            </motion.div>
            {
                focusModeEnabled ?
                <>
                    <LogMenu focused={true} onLogSuccess={handleLogSuccess}/>
                    <FocusedSetHistory />
                    <FocusTimer lastSetTime={lastLogTime} />
                </>
                :
                children
            }
        </>
    )
}

export default FocusMode