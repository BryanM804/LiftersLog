import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { VERSION_NUMBER, WELCOME_DELAY } from "../../utils/constants";
import { useNotifications } from "../contexts/NotificationContext";

const WELCOME_TRANSITION = 1

function Welcome() {

    const returningUser = localStorage.getItem("returningUser")

    const navigate = useNavigate();
    const controls = useAnimation();
    const { addNotification } = useNotifications();

    useEffect(() => {
        console.log(returningUser)
        if (!returningUser) {
            localStorage.setItem("returningUser", "true")
        }

        const lastVersionLogin = localStorage.getItem("lastVersionLogin");
        if (!lastVersionLogin || lastVersionLogin != VERSION_NUMBER) {
            addNotification({ message: `Lifter's Log has updated to version ${VERSION_NUMBER}! Check the changelog under your profile for more information.` });
            console.log("Added update notification")
            localStorage.setItem("lastVersionLogin", VERSION_NUMBER);
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