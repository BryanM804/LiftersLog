import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { WELCOME_DELAY } from "../../utils/constants";

const WELCOME_TRANSITION = 1

function Welcome() {

    const returningUser = localStorage.getItem("returningUser")

    const navigate = useNavigate();
    const controls = useAnimation();

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