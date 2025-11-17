import { useEffect, useRef, useState } from "react";

type FocusTimerProps = {
    lastSetTime: number;
}

function FocusTimer({ lastSetTime }: FocusTimerProps) {

    const [setTimer, setSetTimer] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const textColor = useRef("white")
    const startRef = useRef(0)
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        const savedTime = localStorage.getItem("latestTime");

        if (savedTime) {
            const parsedTime = parseInt(savedTime)

            // if the parsedTime is older than 2 hours
            if (parsedTime + 7200000 < Date.now()) {
                localStorage.removeItem("latestTime")
            } else {
                startRef.current = parsedTime
            }
        }
    }, [])

    useEffect(() => {
        if (!lastSetTime && startRef.current == 0) {
            setIsPaused(true)
        } else {
            setIsPaused(false)
            if (lastSetTime) startRef.current = lastSetTime
        }
    }, [lastSetTime])

    useEffect(() => {
        if (!isPaused) {
            function tick() {
                setSetTimer(Date.now() - startRef.current)

                frameRef.current = requestAnimationFrame(tick);
            }

            frameRef.current = requestAnimationFrame(tick);
        } else {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
        
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }

    }, [isPaused])

    function formatTime(msElapsed: number) {
        let remainingTime = msElapsed
        const hours = Math.floor(remainingTime / 3600000)
        remainingTime %= 3600000
        const minutes = Math.floor(remainingTime / 60000)
        remainingTime %= 60000
        const seconds = (remainingTime / 1000)

        if ((hours > 0 || minutes >= 5) && textColor.current != "red") {
            textColor.current = "red"
        } else if (minutes >= 3 && textColor.current != "yellow") {
            textColor.current = "yellow"
        } else if (textColor.current != "white") {
            textColor.current = "white"
        }

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toFixed(1).padStart(4, "0")}`
    }

    return (
        // Make this floating and stuck to the bottom of the screen
        <div className="focusTimer" style={{color: textColor.current}}>
            {formatTime(setTimer)}
        </div>
    )
}

export default FocusTimer;