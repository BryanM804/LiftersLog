import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import resolveRequest from "../api/resolveRequest";
import ProfilePicture from "../../../components/ProfilePicture";
import { isMobile } from "react-device-detect";

type FriendRequestProps = {
    username: string;
    imageURL: string;
}

function FriendRequest({ username, imageURL }: FriendRequestProps) {

    const queryClient = useQueryClient()

    const [usernameOverflows, setUsernameOverflows] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const usernameRef = useRef<HTMLHeadingElement>(null)

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

    const resolveMutation = useMutation({
            mutationFn: resolveRequest,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["requests"] });
                queryClient.invalidateQueries({ queryKey: ["friends"] });
            }
        })

    function handleResolution(e: SyntheticEvent) {
        if (e.currentTarget.id === "acceptRequest") {
            resolveMutation.mutate({ username: username, resolution: "accept"})
        } else if (e.currentTarget.id === "denyRequest") {
            resolveMutation.mutate({ username: username, resolution: "deny"})
        }
    }

    // TODO: Add sent date
    return (
        <>
            <li className="friend">
            <ProfilePicture imageURL={imageURL} size={ isMobile ? 48 : 76 } />
            <div ref={containerRef} 
                className={`friendText ${usernameOverflows && "overflow"}`}
            >
                <h3 ref={usernameRef} className="friendUsername">{username}</h3>
                <hr style={{marginBottom: "0", marginTop: "0.2rem", opacity: "25%"}} />
                <div style={{display: "flex", flexDirection: "row", alignContent: "center", gap: "0.75rem"}}>
                    <button className="floatingButton requestButton confirmationButton" 
                        onClick={handleResolution}
                        id="acceptRequest"
                    >Accept</button>
                    <button className="floatingButton requestButton" 
                        onClick={handleResolution}
                        id="denyRequest"
                    >Deny</button>
                </div>
            </div>
        </li>
        </>
    )
}

export default FriendRequest