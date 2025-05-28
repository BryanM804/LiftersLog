import { SyntheticEvent, useEffect, useRef, useState } from "react";
import ProfilePicture from "../../../components/ProfilePicture";
import { isMobile } from "react-device-detect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import resolveRequest from "../api/resolveRequest";
import ActivityList from "./ActivityList";

type FriendProps = {
    username: string;
    level?: number;
    lastSeen?: string;
    imageURL: string;
    type: string;
}

function Friend({ username, level, imageURL, type, lastSeen }: FriendProps) {

    const queryClient = useQueryClient();

    const [usernameOverflows, setUsernameOverflows] = useState(false)
    const [expanded, setExpanded] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null)
    const usernameRef = useRef<HTMLHeadingElement>(null)

    const resolveMutation = useMutation({
        mutationFn: resolveRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["requests"] });
            queryClient.invalidateQueries({ queryKey: ["friends"] });
        }
    })

    // Check previous expanded state
    useEffect(() => {
        if (localStorage.getItem(username+"friendCard")) {
            setExpanded(localStorage.getItem(username+"FriendCard") == "expanded")
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

    function handleResolution(e: SyntheticEvent) {
        if (e.currentTarget.id === "acceptRequest") {
            resolveMutation.mutate({ username: username, resolution: "accept"})
        } else if (e.currentTarget.id === "denyRequest") {
            resolveMutation.mutate({ username: username, resolution: "deny"})
        }
    }

    function handleClick() {
        if (!expanded)
            localStorage.setItem(username+"FriendCard", "expanded");
        else
            localStorage.setItem(username+"FriendCard", "collapsed")
        setExpanded(!expanded)
    }

    return (
        <li className="friend">
            <ProfilePicture imageURL={imageURL} size={ isMobile ? 48 : 76 } />
            <div ref={containerRef} 
                className={`friendText ${usernameOverflows && "overflow"}`}
                onClick={handleClick}
            >
                <h3 ref={usernameRef} className="friendUsername">{username}</h3>
                <hr style={{marginBottom: "0", marginTop: "0.2rem", opacity: "25%"}} />
                <p className="friendSubtext">
                    {
                        type == "friend" ?
                        <>
                            Level: {level}<br />
                            Last seen: {lastSeen}
                        </>
                        :
                        <>
                        <button className="smallFloatingButton requestButton" 
                            onClick={handleResolution}
                            id="acceptRequest"
                        >✅</button>
                        <button className="smallFloatingButton requestButton" 
                            onClick={handleResolution}
                            id="denyRequest"
                        >❌</button>
                        </>
                    }
                </p>
            </div>
            <div className={`expansionArrow ${expanded && "expanded"}`}>{"<"}</div>
            <div className={`activityExpand ${expanded && "expanded"}`}>
                <div className="activityContainer">
                    <span style={{fontWeight: "bold"}}>Today</span>
                    <hr />
                    <ActivityList friend={username} timeframe="today" active={expanded}/>
                    <br />
                    <span style={{fontWeight: "bold"}}>Recent</span>
                    <hr />
                    <ActivityList friend={username} timeframe="recent" active={expanded}/>
                </div>
            </div>
        </li>
    )
}

export default Friend;