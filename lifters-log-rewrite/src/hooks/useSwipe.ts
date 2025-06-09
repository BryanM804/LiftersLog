import { useEffect, useRef } from "react";

type UseSwipeProps = {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    threshold?: number;
}

function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50}: UseSwipeProps) {

    const touchStart = useRef<null | number>(null)
    const touchEnd = useRef<null | number>(null)
    // const [swiping, setSwiping] = useState(false)
    // The swiping state was causing re-renders of the logging screen, will hopefully
    // find a fix if necessary later

    useEffect(() => {
        function handleTouchStart(e: TouchEvent) {
            touchEnd.current = null;
            touchStart.current = e.targetTouches[0].clientX
            // setSwiping(true)
        }

        function handleTouchMove(e: TouchEvent) {
            touchEnd.current = e.targetTouches[0].clientX
        }

        function handleTouchEnd() {
            if (!touchStart.current || !touchEnd.current) return

            const swipeDistance = touchEnd.current - touchStart.current

            if (Math.abs(swipeDistance) >= threshold) {
                if (swipeDistance > 0)
                    onSwipeRight?.()
                else
                    onSwipeLeft?.()
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
    }, [onSwipeLeft, onSwipeRight, threshold])
    
    //return { swiping }
    return {}
}

export default useSwipe