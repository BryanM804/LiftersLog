import { useEffect, useRef } from "react";

type UseSwipeProps = {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: (x?: number) => void;
    onSwipeDown?: (x?: number) => void;
    threshold?: number;
}

function useSwipe({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 50}: UseSwipeProps) {

    const touchStartX = useRef<null | number>(null)
    const touchEndX = useRef<null | number>(null)
    const touchStartY = useRef<null | number>(null)
    const touchEndY = useRef<null | number>(null)
    // const [swiping, setSwiping] = useState(false)
    // The swiping state was causing re-renders of the logging screen, will hopefully
    // find a fix if necessary later

    useEffect(() => {
        function handleTouchStart(e: TouchEvent) {
            touchEndX.current = null;
            touchEndY.current = null;
            touchStartX.current = e.targetTouches[0].clientX
            touchStartY.current = e.targetTouches[0].clientY
            // setSwiping(true)
        }

        function handleTouchMove(e: TouchEvent) {
            touchEndX.current = e.targetTouches[0].clientX
            touchEndY.current = e.targetTouches[0].clientY
        }

        function handleTouchEnd() {
            if (!touchStartX.current || !touchEndX.current || !touchStartY.current || !touchEndY.current) return

            const hSwipeDistance = touchEndX.current - touchStartX.current
            const vSwipeDistance = touchEndY.current - touchStartY.current

            if (Math.abs(hSwipeDistance) >= threshold) {
                if (hSwipeDistance > 0)
                    onSwipeRight?.()
                else
                    onSwipeLeft?.()
            }

            if (Math.abs(vSwipeDistance) >= threshold) {
                if (vSwipeDistance > 0) 
                    onSwipeDown?.(touchStartX.current)
                else
                    onSwipeUp?.(touchStartX.current)
            }

            // setSwiping(false)
        }

        document.addEventListener("touchstart", handleTouchStart, )
        document.addEventListener("touchend", handleTouchEnd)
        document.addEventListener("touchmove", handleTouchMove)

        return () => {
            document.removeEventListener("touchstart", handleTouchStart)
            document.removeEventListener("touchend", handleTouchEnd)
            document.removeEventListener("touchmove", handleTouchMove)
        }
    }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold])
    
    //return { swiping }
    return {}
}

export default useSwipe