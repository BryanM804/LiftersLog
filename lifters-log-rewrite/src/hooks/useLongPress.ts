import { useRef, useState } from "react";


function useLongPress(callback: VoidFunction, delay=700) {

    const [isHeld, setIsheld] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function startHold() {
        setIsHolding(true)
        timerRef.current = setTimeout(() => {
            setIsheld(true)
            callback()
        }, delay)
    }

    function endHold() {
        if (timerRef.current)
            clearTimeout(timerRef.current)
        setIsHolding(false)
        setIsheld(false)
    }

    return {
        isHeld,
        isHolding,
        holdHandlers: {
            onPointerDown: startHold,
            onPointerUp: endHold,
            onTouchEnd: endHold
        }
    }

}

export default useLongPress;