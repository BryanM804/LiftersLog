import { ReactNode, useEffect, useState } from "react";
import { useNotifications } from "../app/contexts/NotificationContext";
import Notification from "../types/Notification";

function BannerNotification() {
    
    const [currentMessage, setCurrentMessage] = useState("")
    const [currentChildren, setCurrentChildren] = useState<ReactNode>(null);
    const [isVisible, setIsVisible] = useState(false)

    const { getNextNotification, notifications } = useNotifications();

    useEffect(() => {
        console.log("Notifications updated")

        if (!isVisible) {
            const newNotification = getNextNotification()
            if (newNotification) 
                updateDisplayedNotification(newNotification)
            else
                setIsVisible(false)
        }
    }, [notifications])

    function updateDisplayedNotification(newNotification: Notification) {
        setIsVisible(true)
        setCurrentMessage(newNotification.message)
        if (newNotification.children)
            setCurrentChildren(newNotification.children)
        else
            setCurrentChildren(null)
    }
    
    function handleDismiss() {
        const nextMessage = getNextNotification();

        if (nextMessage) {
            updateDisplayedNotification(nextMessage)
        } else {
            setIsVisible(false)
        }
    }

    return (
        <div
            style={{
                position: "absolute",
                top: "0",
                backgroundColor: "#333",
                height: "17%",
                width: "100%",
                visibility: `${ isVisible ? "visible" : "hidden" }`,
                display: "flex",
                flexDirection: "row"
            }}
        >
            {currentMessage}
            {currentChildren && currentChildren}
            <button onClick={handleDismiss}>x</button>
        </div>
    )
}

export default BannerNotification