import { SyntheticEvent, useEffect, useRef, useState } from "react";
import ProfilePicture from "../../../components/ProfilePicture";
import { isMobile } from "react-device-detect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import resolveRequest from "../api/resolveRequest";

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
    const containerRef = useRef<HTMLDivElement>(null)
    const usernameRef = useRef<HTMLHeadingElement>(null)

    const resolveMutation = useMutation({
        mutationFn: resolveRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["requests", "friends"] });
        }
    })

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

    return (
        <li className="friend">
            <ProfilePicture imageURL={imageURL} size={ isMobile ? 32 : 64 } />
            <div ref={containerRef} className={`friendText ${usernameOverflows && "overflow"}`}>
                <h3 ref={usernameRef} className="friendUsername">{username}</h3>
                <hr style={{marginBottom: "0", marginTop: "0.2rem"}} />
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
        </li>
    )
}

export default Friend;