import { AnimatePresence, motion, useAnimation } from "framer-motion";
import XpBar from "../../../components/XpBar";
import { useEffect, useRef, useState } from "react";
import { XPBAR_ANIMATION_TIME } from "../../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import getCurrentUserXP from "../api/getCurrentUseXP";

const TRANSITION_DURATION = 0.6
const BAR_DELAY = 0.5

function XPBarAnimator() {

    const controls = useAnimation()
    const [initialXp, setInitialXp] = useState(-1)
    const [initialLevel, setInitialLevel] = useState(-1)
    const [newXp, setNewXp] = useState(-1)
    const [maxXp, setMaxXp] = useState(0)
    const hideBarTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const { data } = useQuery({
        queryKey: ["userxp"],
        queryFn: getCurrentUserXP,
        staleTime: Infinity
    })

    useEffect(() => {

        async function animateXp() {
            async function gainXP(newXpAmount: number) {
                await controls.start({ bottom: 60, position: "fixed"})
                setNewXp(newXpAmount)
                if (hideBarTimeoutRef.current) {
                    // In case a user is logging multiple in a row it will reset the timer on the exit animation
                    clearTimeout(hideBarTimeoutRef.current)
                }
                hideBarTimeoutRef.current = setTimeout(() => {
                    controls.start({ bottom: "-200px", position: "fixed"})
                }, (XPBAR_ANIMATION_TIME * 1000) + (BAR_DELAY * 1000))
            }

            if (data) {
                if (initialXp == -1) {
                    setInitialXp(data.xp)
                    setMaxXp(data.level * 1500)
                    setInitialLevel(data.level)
                } else if (data.level > initialLevel) {
                    await gainXP(maxXp)
                    setInitialXp(0)
                    setMaxXp(data.level * 1500)
                    setInitialLevel(data.level)
                    gainXP(data.xp)
                } else {
                    gainXP(data.xp)
                }
            }
        }

        animateXp()
    }, [data])

    return (
        <>
            <AnimatePresence>
                <motion.div
                    key={`xpbar`}
                    initial={{ bottom: "-200px", position: "fixed", y: 0 }}
                    animate={controls}
                    transition={{ duration: TRANSITION_DURATION }}
                    style={{zIndex: 2000, width: "90vw"}}
                    >
                    <XpBar value={initialXp} newValue={newXp} max={maxXp}/>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default XPBarAnimator