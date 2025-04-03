import { useRef, useState } from "react";


function useLongPress(callback: VoidFunction, delay=700) {

    const [isHeld, setIsheld] = useState(false);
    const timerRef = useRef<number | null>(null);

    function startHold() {
        timerRef.current = setTimeout(() => {
            setIsheld(true)
            callback()
        }, delay)
    }

    function endHold() {
        if (timerRef.current)
            clearTimeout(timerRef.current)
        setIsheld(false)
    }

    return {
        isHeld,
        holdHandlers: {
            onPointerDown: startHold,
            onPointerUp: endHold,
            onTouchEnd: endHold
        }
    }

}

export default useLongPress;