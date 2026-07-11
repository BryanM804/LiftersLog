import { createContext, ReactNode, useContext, useState } from "react";
import Notification from "../../types/Notification";

type NotificationContextType = {
    addNotification: (n: Notification) => void;
    notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

type NotificationContextProps = {
    children: ReactNode;
}

function NotificationContextProvider({ children }: NotificationContextProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    function addNotification(n: Notification) {
        setNotifications(prev => [...prev, n]);
    }

    return (
        <NotificationContext.Provider
            value={{
                addNotification,
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