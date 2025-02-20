import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Tooltip } from "react-tooltip";


function CreateAccountForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [hasClickedConfirmPass, setHasClickedConfirmPass] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
    }

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id == "username") {
            setUsername(e.target.value)
        } else if (e.target.id == "password") {
            setPassword(e.target.value)
            if (hasClickedConfirmPass)
                setPasswordsMatch(confirmedPassword == e.target.value)
        } else if(e.target.id == "confirmPassword"){
            setConfirmedPassword(e.target.value)
            if (hasClickedConfirmPass)
                setPasswordsMatch(password == e.target.value)
        }
    }

    return (
        <form>
            <label htmlFor="username">Username</label>
            <br />
            <input className="smallTextInput" type="text" id="username" onChange={handleTextChange} value={username}/>
            <br />
            <label htmlFor="id" data-tooltip-id="idTooltip">Discord ID</label>
            <Tooltip id="idTooltip" place="top" content="Enter your discord user ID if you want your data to sync from the discord bot. If you don't include this you CANNOT sync them later." />
            <br />
            <input className="smallTextInput" type="text" id="id" />
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
    )
}

export default CreateAccountForm;