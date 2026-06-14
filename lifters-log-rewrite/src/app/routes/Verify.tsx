import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import verifyUser from "../../features/auth/api/verifyUser";
import { useEffect, useState } from "react";
import requestVerification from "../../features/auth/api/requestVerification";


function Verify() {

    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate()

    const [infoMessage, setInfoMessage] = useState("Verifying...")
    const [errorVerifying, setErrorVerifying] = useState(false)

    const verifyMutation = useMutation({
        mutationFn: verifyUser,
        onSuccess: () => {
            setInfoMessage("Account verified! Redirecting to login...")
            setTimeout(() => {
                navigate("/")
            }, 2000)
        },
        onError: (error: Error) => {
            setInfoMessage("Error verifying account: " + error.message)
            setErrorVerifying(true)
        }
    });
    const requestVerificationMutation = useMutation({
        mutationFn: requestVerification,
        onSuccess: () => {
            setInfoMessage("Verification email sent! Please check your inbox.")
        },
        onError: (error: Error) => {
            setInfoMessage(`Unable to resend verification email: ${error}`)
        }
    })

    useEffect(() => {
        if (token){
            verifyMutation.mutate(token)
        } else {
            setErrorVerifying(true)
            setInfoMessage("No token found, please click the link found in your email.")
        }
    }, [])

    function handleResendClick() {
        if (token) {
            requestVerificationMutation.mutate(token)
        }
    }

    return (
        <>
            <div className="mainContentPane">
                <h2>{infoMessage}</h2>
                {
                    errorVerifying &&
                    <button className="floatingButton" onClick={handleResendClick}>Resend Verification Email</button>
                }
            </div>
        </>
    )
}

export default Verify;