import { useEffect, useRef, useState } from "react";
import ProfilePicture from "../../../components/ProfilePicture";
import { isMobile } from "react-device-detect";
import ActivityList from "./ActivityList";
import FriendProfile from "./FriendProfile";

type FriendProps = {
    username: string;
    level: number;
    lastSeen: string;
    imageURL: string;
}

function Friend({ username, level, imageURL, lastSeen }: FriendProps) {

    const [usernameOverflows, setUsernameOverflows] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null)
    const usernameRef = useRef<HTMLHeadingElement>(null)

    // Check previous expanded state
    useEffect(() => {
        if (localStorage.getItem(username+"FriendCard")) {
            setExpanded(localStorage.getItem(username+"FriendCard") === "expanded")
        }
    }, [])

    // Check name overflow
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

    function handleClick() {
        if (!expanded)
            localStorage.setItem(username+"FriendCard", "expanded");
        else
            localStorage.setItem(username+"FriendCard", "collapsed")
        setExpanded(!expanded)
    }

    return (
        <>
        <FriendProfile username={username} isOpen={isProfileOpen} cancelFn={() => setIsProfileOpen(false)} />
        <li className="friend">
            <ProfilePicture imageURL={imageURL} size={ isMobile ? 48 : 76 } onClick={() => setIsProfileOpen(true)}/>
            <div ref={containerRef} 
                className={`friendText ${usernameOverflows && "overflow"}`}
                onClick={handleClick}
            >
                <h3 ref={usernameRef} className="friendUsername">{username}</h3>
                <hr style={{marginBottom: "0", marginTop: "0.2rem", opacity: "25%"}} />
                <p className="friendSubtext">      
                    Level: {level}<br />
                    Last seen: {lastSeen}
                </p>
            </div>
            <div className={`expansionArrow ${expanded && "expanded"}`}>{"<"}</div>
            <div className={`activityExpand ${expanded && "expanded"}`}>
                <div className="activityContainer">
                    <ActivityList friend={username} active={expanded}/>
                </div>
            </div>
        </li>
        </>
    )
}

export default Friend;