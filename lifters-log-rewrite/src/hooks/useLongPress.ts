import { PointerEvent, useRef, useState } from "react";


function useLongPress(callback: VoidFunction, delay=700) {

    const MOVEMENT_THRESHOLD = 10;

    const [isHeld, setIsheld] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startX = useRef<number>(0)
    const startY = useRef<number>(0)

    function startHold(e: PointerEvent) {
        setIsHolding(true)

        startX.current = e.clientX
        startY.current = e.clientY
        timerRef.current = setTimeout(() => {
            setIsheld(true)
            callback()
        }, delay)
    }

    function onMove(e: PointerEvent) {
        if (!timerRef.current) return

        const dx = e.clientX - startX.current
        const dy = e.clientY - startY.current
        if (Math.abs(dx) > MOVEMENT_THRESHOLD || Math.abs(dy) > MOVEMENT_THRESHOLD) {
            endHold()
        }
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
            onPointerMove: onMove,
            onPointerCancel: endHold
        }
    }

}

export default useLongPress;