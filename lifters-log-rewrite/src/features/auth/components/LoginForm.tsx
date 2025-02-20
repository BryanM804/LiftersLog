import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        // PLACEHOLDER CODE UNTIL SERVER IS SET UP
        if (username == "brymul" && password == "1234") {
            navigate("/profile")
        }
    }

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id == "username") {
            setUsername(e.target.value);
        } else if (e.target.id == "password") {
            setPassword(e.target.value);
        }
    }

    return (
        <form>
            <label htmlFor="username">Username</label>
            <br />
            <input className="smallTextInput" type="text" id="username" onChange={handleTextChange} value={username}/>
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input className="smallTextInput" type="password" id="password" onChange={handleTextChange} value={password}/>
            <br />
            <div style={{textAlign: "center"}}>
                <input className="floatingButton fullWidth" type="submit" value="Login" onClick={handleSubmit} />
            </div>
        </form>
    )
}

export default LoginForm;