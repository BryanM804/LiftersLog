import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PLACEHOLDERUSERDATA, SERVER_URL, WELCOME_DELAY } from "../../utils/constants";
import urlBase64ToUint8Array from "../../utils/baseConverter";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../types/UserData";

const WELCOME_TRANSITION = 1

function Welcome() {

    const returningUser = localStorage.getItem("returningUser")

    const navigate = useNavigate();
    const controls = useAnimation();

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    useEffect(() => {
        async function setupNotifications() {
            if (!("serviceWorker" in navigator)) return

            const reg = await navigator.serviceWorker.register("/sw.js");

            const permissions = await Notification.requestPermission();
            if (permissions != "granted") return

            console.log(import.meta.env.VITE_PUBLIC_VAPID_KEY)
            console.log(urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPID_KEY))

            const subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPID_KEY ?? "")
            })

            // Might change to a mutation later to verify that the server received the subscription
            await fetch(`${SERVER_URL}/notifications/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({subscription: subscription, userid: authUser.userid})
            });

            console.log("Subscribed to push notifications")
        }

        setupNotifications()
    }, [])

    useEffect(() => {
        console.log(returningUser)
        if (!returningUser) {
            localStorage.setItem("returningUser", "true")
        }
        setTimeout(() => {
            controls.start({opacity: 0})
            setTimeout(() => {
                navigate("/logging")
            }, WELCOME_TRANSITION * 1000)
        }, WELCOME_DELAY * 1000)
    }, [])

    return (
        <AnimatePresence >
            <motion.div 
                animate={controls}
                className="welcomeScreen"
                transition={{duration: WELCOME_TRANSITION}}
            >
                {
                    returningUser ?
                        <h1 className="welcomeMessage">Welcome Back</h1>
                    :
                        <h1 className="welcomeMessage">Welcome</h1>
                }
            </motion.div>
        </AnimatePresence>
    )
}

export default Welcome