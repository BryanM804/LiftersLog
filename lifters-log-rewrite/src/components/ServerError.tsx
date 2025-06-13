import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

type ServerErrorProps = {
    error?: Error;
}

function ServerError({ error }: ServerErrorProps) {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const signOut = useSignOut();

    const navigatedRef = useRef<boolean | null>()

    useEffect(() => {
        if (!navigatedRef.current && error?.message.includes("401")) {
            console.log("Navigating unauthed user")
            navigatedRef.current = true
            queryClient.clear() // Clear the queryClient to remove all errors, making sure this navigate doesn't trigger again
            signOut(); // Make sure react auth kit knows the user is signed out
            navigate("/")
        }
    }, [error])

    if (error) {
        return (
            <div>Server Error Occurred: {error.toString()}</div>
        )
    } else {
        return <div>Server Error Occurred</div>
    }
    
}

export default ServerError