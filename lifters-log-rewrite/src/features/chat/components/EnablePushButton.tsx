import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import urlBase64ToUint8Array from "../../../utils/baseConverter";
import { PLACEHOLDERUSERDATA, SERVER_URL } from "../../../utils/constants";
import UserData from "../../../types/UserData";
import { useEffect, useState } from "react";


function EnablePushButton() {

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const notificationsEnabled = localStorage.getItem("notificationsEnabled")
        if (notificationsEnabled && notificationsEnabled == "true") {
            setIsVisible(false)
        }
    }, [])

    async function setupNotifications() {
        if (!("serviceWorker" in navigator)) return

        const reg = await navigator.serviceWorker.register("/sw.js");

        const permissions = await Notification.requestPermission();
        if (permissions != "granted") return

        const subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPID_KEY ?? "")
        })

        console.log(import.meta.env.VITE_PUBLIC_VAPID_KEY ?? "")

        // Might change to a mutation later to verify that the server received the subscription
        await fetch(`${SERVER_URL}/notifications/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({subscription: subscription, userid: authUser.userid})
        });

        console.log("Subscribed to push notifications")
        localStorage.setItem("notificationsEnabled", "true")
    }
    
    return (
        <button
            onClick={setupNotifications}
            style={{
                visibility: `${isVisible ? "visible" : "hidden"}`
            }}
        >
            Enable Push Notifications
        </button>
    )
}

export default EnablePushButton;