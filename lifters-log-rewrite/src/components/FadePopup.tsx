import { AnimatePresence, motion } from "framer-motion";

type FadePopupProps = {
    text: string;
    duration?: number;
}

function FadePopup({ text, duration = 0.8 }: FadePopupProps) {

    return (
        <AnimatePresence>
            <motion.div
                initial={{visibility: "visible", opacity: 1}}
                animate={{opacity: 0, visibility: "hidden"}}
                transition={{ duration: duration }}
                className="popupCard"
                >
                {text}
            </motion.div>
        </AnimatePresence>
    )
}

export default FadePopup