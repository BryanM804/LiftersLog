import { useRef } from "react";


function useDoublePress(callback: () => void, maxDelay = 200) {

    const firstPress = useRef<number>(0);

    function recordLastPress() {
        const now = Date.now();

        if (now - firstPress.current < maxDelay) {
            callback()
        }

        firstPress.current = now;
    }

    return (
        {
            doublePressHandlers: {
                onPointerUp: recordLastPress
            }
        }
    )

}

export default useDoublePress;