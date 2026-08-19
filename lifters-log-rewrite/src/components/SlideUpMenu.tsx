import { motion, useMotionValue } from "framer-motion";
import { ReactNode, useEffect } from "react";

type SlideUpMenuProps = {
    onCancel: () => void;
    children: ReactNode;
}

const CLOSE_THRESHOLD = 200

function SlideUpMenu({onCancel, children}: SlideUpMenuProps) {

    const y = useMotionValue(0);

    useEffect(() => {
        const unsubscribe = y.on("change", (latest) => {
            if (latest > 500) {
                y.set(500)
            } else if (latest < 0) {
                y.set(0)
            }
        })

        return unsubscribe
    }, [y])

    return (
        <>
            <div className="backgroundDim" onClick={onCancel}></div>
            <motion.div 
                className="slideUpMenu"
                drag="y"
                dragConstraints={{top: 0, bottom: 0}}
                onDragEnd={(_, info) => { if (info.offset.y > CLOSE_THRESHOLD) onCancel()}}
                initial={{bottom: "-75vh"}}
                animate={{bottom: 0}}
                transition={{duration: 0.17}}
                style={{
                    backgroundColor: "#333",
                    position: "fixed",
                    bottom: 0,
                    height: "75vh",
                    width: "98vw",
                    left: "1vw",
                    zIndex: 1000,
                    textAlign: "center",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    y
                }}    
            >
                <div 
                    className="slideUpContent"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    >
                    <hr 
                        style={{
                            width: "30%",
                            marginBottom: "0",
                            marginTop: "0.65rem",
                            borderRadius: "999px"
                        }}
                    />
                    {children}
                </div>
            </motion.div>
        </>
    )
}

export default SlideUpMenu;