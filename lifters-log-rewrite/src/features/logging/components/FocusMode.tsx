import { ReactNode, useEffect, useRef, useState } from "react"
import useSwipe from "../../../hooks/useSwipe";
import useLongPress from "../../../hooks/useLongPress";
import LogMenu from "./LogMenu";
import { useMovement } from "../contexts/MovementContextProvider";
import FocusedSetHistory from "./FocusedSetHistory";
import FocusTimer from "./FocusTimer";
import { useAnimation, motion } from "framer-motion";
import upArrow from "../../../assets/UpArrow.png"
import downArrow from "../../../assets/DownArrow.png"

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
    const controls = useAnimation();
    const upControls = useAnimation();
    const downControls = useAnimation();

    async function animateUp(startX: number, startY: number) {
        upControls.set({ x: startX, y: startY, visibility: "visible", opacity: "50%" })
        await upControls.start({ y: startY - 300, opacity: 0, transition: { duration: 0.5 }});
        upControls.set({ visibility: "hidden" })
    }
    async function animateDown(startX: number, startY: number) {
        downControls.set({ x: startX, y: startY, visibility: "visible", opacity: "50%" })
        await downControls.start({ y: startY + 300, opacity: 0, transition: { duration: 0.5 }});
        downControls.set({ visibility: "hidden" })
    }

    const {} = useSwipe({
        onSwipeUp: (x, y) => {
            if (!x || !focusModeEnabled) return

            if (x > (width / 2)) {
                // Right side
                setReps(reps + 1)
            } else {
                // Left side
                setWeight(weight + 5)
            }

            if (y) animateUp(x, y)
        },
        onSwipeDown: (x, y) => {
            if (!x || !focusModeEnabled) return

            if (x > (width / 2)) {
                // Right side
                setReps(reps > 0 ? reps - 1 : reps)
            } else {
                // Left side
                setWeight(weight > 0 ? weight - 5 : weight)
            }

            if (y) animateDown(x, y)
        }
    })

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
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
                    <motion.img 
                        id="upArrowAnimation"
                        src={upArrow}
                        height={48}
                        width={48}
                        style={{ position: "absolute", margin: "none", left: 0, top: 0}}
                        initial={{ visibility: "hidden"}}
                        animate={upControls}
                    />
                    <motion.img 
                        id="downArrowAnimation"
                        src={downArrow}
                        height={48}
                        width={48}
                        style={{ position: "absolute", margin: "none", left: 0, top: 0 }}
                        initial={{ visibility: "hidden"}}
                        animate={downControls}
                    />
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