import "../../features/logging/logging.css";
import RecentHistory from "../../features/logging/components/RecentHistory";
import NoteSection from "../../features/logging/components/NoteSection";
import AuthChecker from "../../components/AuthChecker";
import LogMenu from "../../features/logging/components/LogMenu";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useEffect, useMemo, useRef, useState } from "react";
import CardioMenu from "../../features/logging/components/CardioMenu";
import useSwipe from "../../hooks/useSwipe";
import { isDesktop } from "react-device-detect";
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import FadePopup from "../../components/FadePopup";
import { useDate } from "../../features/history/contexts/DateContextProvider";
import { Container, Engine } from "@tsparticles/engine"
import { EmitterContainer, loadEmittersPlugin } from "@tsparticles/plugin-emitters"
import { loadAbsorbersPlugin } from "@tsparticles/plugin-absorbers"
import { initParticlesEngine, Particles } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import XPBarAnimator from "../../features/logging/components/XPBarAnimator";
import { useQueryClient } from "@tanstack/react-query";
import { XPCOLOR } from "../../utils/constants";

function Logging() {

    const { historyDate, setHistoryDate, stickyDate } = useDate()
    const queryClient = useQueryClient()

    const [showWarning, setShowWarning] = useState(false)
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1) // 1 for right, -1 for left
    const [particlesReady, setParticlesReady] = useState(false)

    const { } = useSwipe({
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

    // Reset the date to today in case the user was browsing history and navigates back
    // without intending to log old data (sticky date)
    useEffect(() => {
        const onTodaysDate = new Date().getDate() == historyDate.getDate()

        if (!onTodaysDate && !stickyDate) {
            setHistoryDate(new Date())
        } else if (stickyDate && !onTodaysDate) [
            setShowWarning(true)
        ]
    }, [historyDate])



    // Particles

    const particlesRef = useRef<EmitterContainer | undefined>(undefined);

    const particlesOptions = useMemo(() => ({
        fullScreen: {
            enable: true,
            zIndex: 5
        },
        particles: {
            number: {
                value: 0
            }
        },
        detectRetina: true,
        emitters: [],
        absorbers: {
            draggable: false,
            destroy: true,
            opacity: 0,
            size: {
                limit: {
                    radius: 150,
                    mass: 100
                },
                value: 150,
                density: 100
            },
            position: { x: 50, y: 100 }
        }
    }), [])

    // Initialize particle engine and set state when finished
    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine)
            await loadEmittersPlugin(engine)
            await loadAbsorbersPlugin(engine)
        }).then(() => setParticlesReady(true))
    }, [])

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log("Particles loaded")
        if (container)
            particlesRef.current = container as EmitterContainer
    }

    function handleLogSuccess(xpParticleMultiplier: number) {
        // emit particle

        const tryEmit = () => {
            const container = particlesRef.current as EmitterContainer
            const canvas = container.canvas?.element;

            if (!canvas || !container) {
                if (!canvas)
                    console.warn("Canvas not available yet, retrying...");
                if (!container)
                    console.warn("Container not available yet, retrying...");
                setTimeout(tryEmit, 50); // retry in 50ms
                return;
            }

            // This is a bunch of positioning I didn't end up needing because of the domId property I didn't know about
            // Leaving it in case I need it again at some point
            // Get center position of the button for the emitter
            // const buttonBoundingBox = button.getBoundingClientRect()
            // const canvasBoundingBox = canvas.getBoundingClientRect()

            // const emitterX = ((buttonBoundingBox.left + buttonBoundingBox.width / 2) - canvasBoundingBox.left) / canvasBoundingBox.width * 100;
            // const emitterY = ((buttonBoundingBox.top + buttonBoundingBox.height / 2) - canvasBoundingBox.top) / canvasBoundingBox.height * 100;
            // Emitter expects x and y to be percentages of the screen

            container.addEmitter({
                autoPlay: true,
                direction: "top",
                domId: "logButton",
                rate: {
                    quantity: xpParticleMultiplier, //xp related number here later
                    delay: 0.1
                },
                life: {
                    duration: 0.1,
                    count: 1
                },
                size: {
                    height: 20,
                    width: 20
                },
                particles: {
                    shape: {
                        type: "circle"
                    },
                    size: {
                        value: { min: 4, max: 6 },
                    },
                    color: { value: XPCOLOR },
                    opacity: {
                        value: 0.65,
                    },
                    move: {
                        speed: 10,
                        direction: "bottom",
                        outModes: "bounce", // I like bounce for now, might go back to destroy later
                        enable: true,
                    },
                    life: {
                        duration: {
                            value: 1
                        }
                    }
                }
            });

            console.log("Spawned emitter")
            queryClient.invalidateQueries({
                queryKey: ["userxp"]
            })
        };

        tryEmit();
    }

    function LogScreen() {
        return (
            <>
                <FadePopup text="Lifts" />
                <LogMenu onLogSuccess={handleLogSuccess}/>
                <NoteSection />
                <RecentHistory />
                <XPBarAnimator />
            </>
        )
    }

    function CardioScreen () {
        return (
            <>
                <FadePopup text="Cardio" />
                <CardioMenu onLogSuccess={handleLogSuccess}/>
                <RecentHistory />
                <XPBarAnimator />
            </>
        )
    }

    const screens = useMemo(() => [<LogScreen />, <CardioScreen />], []);

    return (
        <>
        <AuthChecker />
        {
            particlesReady ?
            <div style={{pointerEvents: "none", touchAction: "none"}}>
                <Particles
                    id="xpParticles"
                    particlesLoaded={particlesLoaded}
                    options={particlesOptions}
                    style={{position: "fixed", top: "0", left: "0", height: "100vh", width: "100vw"}}
                />
            </div>
            :
            <></>
        }
        
        {
            showWarning && 
            <FadePopup text={`Logging to ${historyDate.toDateString()}`} duration={4} />
        }
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