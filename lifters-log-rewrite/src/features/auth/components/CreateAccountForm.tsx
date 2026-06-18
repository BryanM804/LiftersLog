import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import createNewUser from "../api/createNewUser";
import { checkEmail, checkPassword, checkUsername } from "../../../utils/checkStrings";


function CreateAccountForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [statusUpdate, setStatusUpdate] = useState("")

    const newAccountMutation = useMutation({
        mutationFn: createNewUser,
        onSuccess: (response) => {
            if (response.message == "Success") {
                setStatusUpdate("Account Successfully Created! Please check your email to verify your account.");
            } else {
                setStatusUpdate("Error creating account.")
            }
        },
        onError: (error) => {
            setStatusUpdate(error.message)
        }
    });

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        if (!checkEmail(email)) {
            setStatusUpdate("Invalid email format ex: yourname@domain.com")
        }
        if (!checkPassword(password)) {
            setStatusUpdate("Invalid password, must be at least 4 characters")
        }
        if (!checkUsername(username)) {
            setStatusUpdate("Invalid username, must be between 2 and 64 characters")
        }
        if (passwordsMatch && confirmedPassword != "") {
            newAccountMutation.mutate({username, password, email});
        }
    }

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id == "username") {
            setUsername(e.target.value)
        } else if (e.target.id == "password") {
            setPassword(e.target.value)
            if (confirmedPassword != "")
                setPasswordsMatch(confirmedPassword == e.target.value)
        } else if (e.target.id == "confirmPassword") {
            setConfirmedPassword(e.target.value)
            if (confirmedPassword != "")
                setPasswordsMatch(password == e.target.value)
        } else if (e.target.id == "email") {
            setEmail(e.target.value)
        }
    }

    return (
        <>
        <form>
            <label htmlFor="username">Username</label>
            <br />
            <input className="smallTextInput" type="text" id="username" onChange={handleTextChange} value={username}/>
            <br />
            <label htmlFor="id" data-tooltip-id="idTooltip">Email</label>
            <br />
            <input className="smallTextInput" type="text" id="email" onChange={handleTextChange} value={email} />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input className="smallTextInput" type="password" id="password" onChange={handleTextChange} value={password}/>
            <br />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input className="smallTextInput" type="password" id="confirmPassword" onChange={handleTextChange} value={confirmedPassword} />
            <br />
            <div style={{textAlign: "center"}}>
                <input className="floatingButton fullWidth" type="submit" value="Create Account" onClick={handleSubmit}/>
            </div>
            <div className={passwordsMatch ? "hidden" : "warningText"} id="passwordWarning">Passwords do not match!</div>
        </form>
        <div id="accountCreatedStatus" className={statusUpdate != "" ? "" : "hidden"} >{statusUpdate}</div>
        </>
    )
}

export default CreateAccountForm;