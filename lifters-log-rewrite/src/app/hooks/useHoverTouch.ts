import { useCallback, useState } from "react";


function useHoverTouch() {
    
    const [isHovering, setIsHovering] = useState(false);

    const handlePointerEnter = useCallback(() => setIsHovering(true), []);
    const handlePointerLeave = useCallback(() => setIsHovering(false), []);
    const handlePointerDown = useCallback(() => setIsHovering(true), []);
    const handlePointerUp = useCallback(() => setIsHovering(false), []);

    return {
        isHovering,
        hoverHandlers: {
            onPointerEnter: handlePointerEnter,
            onPointerLeave: handlePointerLeave,
            onPointerDown: handlePointerDown,
            onPointerUp: handlePointerUp
        }
    }
}

export default useHoverTouch;