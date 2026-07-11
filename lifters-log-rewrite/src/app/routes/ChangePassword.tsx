import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import verifyToken from "../../features/auth/api/verifyToken";
import { checkPassword } from "../../utils/checkStrings";
import changePassword from "../../features/auth/api/changePassword";

function ChangePassword() {

    const { token } = useParams<{ token: string }>();

    const navigate = useNavigate()

    const emailRef = useRef("");

    const [newPassword, setNewPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [verifiedToken, setVerifiedToken] = useState(false)

    const tokenVerificationMutation = useMutation({
        mutationFn: verifyToken,
        onSuccess: (result) => {
            setVerifiedToken(true)
            if (result.email) {
                emailRef.current = result.email;
            }
        },
        onError: (error: Error) => {
            setErrorMessage(error.message);
        }
    });
    const changePasswordMutation = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            setErrorMessage("Password successfully changed! Redirecting to login...")
            setTimeout(() => {
                navigate("/")
            }, 2500)
        }
    })

    useEffect(() => {
        if (token)
            tokenVerificationMutation.mutate(token)
        else
            setErrorMessage("Invalid token, please follow the link provided in your email.")
    }, [])

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id == "newPassword") {
            setNewPassword(e.target.value)
            if (confirmedPassword != "")
                setPasswordsMatch(confirmedPassword === e.target.value)
        } else if (e.target.id == "confirmedPassword") {
            setConfirmedPassword(e.target.value)
            if (confirmedPassword != "")
                setPasswordsMatch(newPassword === e.target.value)
        }
    }

    function submitPasswordChange() {
        if (verifiedToken && passwordsMatch) {
            if (emailRef.current == "") {
                setErrorMessage("Server error occurred. Please try refreshing the page.")
                return
            }
            if (checkPassword(newPassword))
                changePasswordMutation.mutate({ email: emailRef.current, newPassword: newPassword })
            else
                setErrorMessage("Password must be longer than 4 characters!")
        }
    }

    return (
        <div className="mainContentPane">
            <div>{errorMessage}</div>
            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                New Password
                <input 
                    type={passwordVisibility ? "text" : "password"} 
                    className="smallTextInput" 
                    id="newPassword"
                    value={newPassword} 
                    onChange={handleTextChange}
                />
                Confirm Password
                <input 
                    type={passwordVisibility ? "text" : "password"} 
                    className="smallTextInput" 
                    id="confirmedPassword" 
                    value={confirmedPassword}
                    onChange={handleTextChange}
                />
                <button onClick={() => setPasswordVisibility(!passwordVisibility)}>show password</button>
                <button
                    onClick={submitPasswordChange}
                    className="floatingButton"
                >
                    Change Password
                </button>
                <div className={passwordsMatch ? "hidden" : "warningText"} id="passwordWarning">Passwords do not match!</div>
            </div>
        </div>
    )
}

export default ChangePassword;