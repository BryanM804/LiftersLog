import { createContext, ReactNode, useContext, useRef, useState } from "react";
import Notification from "../../types/Notification";

type NotificationContextType = {
    getNextNotification: () => Notification | null;
    addNotification: (n: Notification) => void;
    notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

type NotificationContextProps = {
    children: ReactNode;
}

function NotificationContextProvider({ children }: NotificationContextProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const displayedMessageRef = useRef(0)

    function addNotification(n: Notification) {
        setNotifications(prev => [...prev, n]);
    }

    function getNextNotification() {
        if (notifications.length > displayedMessageRef.current + 1) {
            displayedMessageRef.current++
            return notifications[displayedMessageRef.current]
        } else {
            return null
        }
    }

    return (
        <NotificationContext.Provider
            value={{
                addNotification,
                getNextNotification,
                notifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications(): NotificationContextType {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("useNotifications must be used within a NotificationContextProvider")
    }

    return context
}

export default NotificationContextProvider