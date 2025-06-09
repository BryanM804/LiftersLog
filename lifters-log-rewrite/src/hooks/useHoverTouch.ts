import { useCallback, useState } from "react";
import { isMobile } from "react-device-detect";


function useHoverTouch() {
    
    const [isHovering, setIsHovering] = useState(false);

    const handlePointerEnter = useCallback(() => setIsHovering(true), []);
    const handlePointerLeave = useCallback(() => setIsHovering(false), []);
    const handlePointerDown = useCallback(() => setIsHovering(true), []);
    const handlePointerUp = useCallback(() => setIsHovering(false), []);

    // function onTouchMove() {

    // }

    if (isMobile) {
        return {
            isHovering,
            hoverHandlers: {
                onPointerDown: handlePointerDown,
                onPointerUp: handlePointerUp,
                onTouchEnd: handlePointerUp
            }
        }
    } else {
        return {
            isHovering,
            hoverHandlers: {
                onPointerEnter: handlePointerEnter,
                onPointerLeave: handlePointerLeave
            }
        }
    }
    
}

export default useHoverTouch;