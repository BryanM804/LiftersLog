import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import authenticateUser from "../api/authenticateUser";
import useSignIn from "react-auth-kit/hooks/useSignIn";


function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const signIn = useSignIn();

    const authMutation = useMutation({
        mutationFn: authenticateUser,
        onSuccess: (response) => {
            if (response.token) {
                signIn({
                    auth: {
                        token: response.token
                    },
                    userState: {
                        username: response.username,
                        userid: response.userid
                    }
                });
                navigate("/logging");
            } else {
                setFailedLogin(true);
            }
        }
    })

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        authMutation.mutate({username, password, rememberMe})
    }

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id == "username") {
            setUsername(e.target.value);
        } else if (e.target.id == "password") {
            setPassword(e.target.value);
        }
    }

    function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        setRememberMe(e.target.checked)
    }

    return (
        <>
            <form>
                <label htmlFor="username">Username</label>
                <br />
                <input className="smallTextInput" type="text" id="username" onChange={handleTextChange} value={username}/>
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input className="smallTextInput" type="password" id="password" onChange={handleTextChange} value={password}/>
                <br />
                <div style={{textAlign: "center", display: "flex", flexDirection: "column", marginTop: "0.5rem"}}>
                    <label htmlFor="rememberMeCheckbox" className="plainLink">
                        Remember Me
                        <input type="checkbox" id="rememberMeCheckbox" onChange={handleCheckboxChange} />
                    </label>
                    <input className="floatingButton fullWidth" type="submit" value="Login" onClick={handleSubmit} />
                </div>
                
            </form>
            <div id="loginError" className={failedLogin ? "warningText" : "hidden"}>Incorrect username or password.</div>
        </>
    )
}

export default LoginForm;