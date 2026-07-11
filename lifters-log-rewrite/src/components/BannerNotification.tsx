import { ReactNode, useEffect, useRef, useState } from "react";
import { useNotifications } from "../app/contexts/NotificationContext";

function BannerNotification() {
    
    const [currentMessage, setCurrentMessage] = useState("")
    const [currentChildren, setCurrentChildren] = useState<ReactNode>(null);
    const [isVisible, setIsVisible] = useState(false)

    const indexRef = useRef(-1);
    const intervalRef = useRef<number>(0)

    const { notifications } = useNotifications();

    useEffect(() => {
        console.log("Notifications updated")

        if (!isVisible) {
            setIsVisible(true)
            if (intervalRef.current != 0)
                clearTimeout(intervalRef.current)
            updateDisplayedNotification()
            intervalRef.current = setInterval(updateDisplayedNotification, 7500)
        }
    }, [notifications])

    function updateDisplayedNotification() {
        if (indexRef.current + 1 < notifications.length - 1)
            indexRef.current++
        else if (notifications.length > 0)
            indexRef.current = 0
        else
            setIsVisible(false)

        const currentNotif = notifications[indexRef.current]
        if (!currentNotif) return

        setCurrentMessage(currentNotif.message)
        if (currentNotif.children)
            setCurrentChildren(currentNotif.children)
        else
            setCurrentChildren(null)

        console.log("Notification switched")
    }
    
    function handleDismiss() {
        setIsVisible(false)
        if (intervalRef.current != 0) {
            clearInterval(intervalRef.current)
            intervalRef.current = 0
        }
    }

    return (
        <div
            style={{
                position: "absolute",
                top: "0",
                backgroundColor: "#333",
                height: "7.5%",
                width: "100%",
                visibility: `${ isVisible ? "visible" : "hidden" }`,
                display: "flex",
                flexDirection: "row",
                zIndex: "10"
            }}
        >
            {currentMessage}
            {currentChildren && currentChildren}
            <button onClick={handleDismiss}>x</button>
        </div>
    )
}

export default BannerNotification