import { useEffect, useRef, useState } from "react";
import ProfilePicture from "../../../components/ProfilePicture";
import { isMobile } from "react-device-detect";

type FriendProps = {
    username: string;
    level: number;
    imageURL: string;
}

function Friend({ username, level, imageURL }: FriendProps) {

    const [usernameOverflows, setUsernameOverflows] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const usernameRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current && usernameRef.current) {
                setUsernameOverflows(usernameRef.current.scrollWidth > containerRef.current.clientWidth)
            }
        }
        setTimeout(checkOverflow, 50) // Make sure the content on the page has enough time to load

        window.addEventListener("resize", checkOverflow);

        // Cleanup
        return () => window.removeEventListener("resize", checkOverflow)
    }, [])

    return (
        <li className="friend">
            <ProfilePicture imageURL={imageURL} size={ isMobile ? 32 : 64 } />
            <div ref={containerRef} className={`friendText ${usernameOverflows && "overflow"}`}>
                <h3 ref={usernameRef} className="friendUsername">{username}</h3>
                <hr style={{marginBottom: "0", marginTop: "0.2rem"}} />
                <p className="friendSubtext">
                    Level: {level}<br></br>
                    Last seen:
                </p>
            </div>
        </li>
    )
}

export default Friend;