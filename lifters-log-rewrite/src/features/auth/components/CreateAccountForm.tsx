import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Tooltip } from "react-tooltip";
import createNewUser from "../api/createNewUser";


function CreateAccountForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userid, setUserId] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [hasClickedConfirmPass, setHasClickedConfirmPass] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [statusUpdate, setStatusUpdate] = useState("")

    const newAccountMutation = useMutation({
        mutationFn: createNewUser,
        onSuccess: (response) => {
            if (response.message == "Success") {
                setStatusUpdate("Account Successfully Created!");
            } else if (response.error == "Username taken.") {
                setStatusUpdate("Username already in use.")
            } else {
                setStatusUpdate("Error creating account.")
            }
        }
    });

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        if (passwordsMatch && hasClickedConfirmPass && validatePassword()) {
            newAccountMutation.mutate({username, password, userid});
        }
    }

    function validatePassword() {
        // TODO: add password requirements
        return password.length >= 4;
    }

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id == "username") {
            setUsername(e.target.value)
        } else if (e.target.id == "password") {
            setPassword(e.target.value)
            if (hasClickedConfirmPass)
                setPasswordsMatch(confirmedPassword == e.target.value)
        } else if (e.target.id == "confirmPassword") {
            setConfirmedPassword(e.target.value)
            if (hasClickedConfirmPass)
                setPasswordsMatch(password == e.target.value)
        } else if (e.target.id == "id") {
            setUserId(e.target.value)
        }
    }

    return (
        <>
        <form>
            <label htmlFor="username">Username</label>
            <br />
            <input className="smallTextInput" type="text" id="username" onChange={handleTextChange} value={username}/>
            <br />
            <label htmlFor="id" data-tooltip-id="idTooltip">Discord ID</label>
            <Tooltip 
                id="idTooltip" 
                place="top" 
                content="Enter your discord user ID if you want your data to sync from the discord bot. If you don't include this you CANNOT sync them later." 
                className="niceTooltip"
                />
            <br />
            <input className="smallTextInput" type="text" id="id" onChange={handleTextChange} value={userid} />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input className="smallTextInput" type="password" id="password" onChange={handleTextChange} value={password}/>
            <br />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input className="smallTextInput" type="password" id="confirmPassword" onClick={() => setHasClickedConfirmPass(true)} onChange={handleTextChange} value={confirmedPassword} />
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