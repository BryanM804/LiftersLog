import { SyntheticEvent, useState } from "react";
import LoginForm from "../../features/auth/components/LoginForm";
import CreateAccountForm from "../../features/auth/components/CreateAccountForm";

function Login() {

    const [creatingAccount, setCreatingAccount] = useState(false)

    function handleClick(e: SyntheticEvent) {
        if (e.currentTarget.id == "createAccountLink") {
            setCreatingAccount(true);
        } else {
            setCreatingAccount(false);
        }
    }

    return (
        <div className="mainContentPane">
            { creatingAccount ? <CreateAccountForm /> : <LoginForm /> }
            <br /><br />
            <a className="plainLink" onClick={handleClick} id={ creatingAccount ? "loginLink" : "createAccountLink"}>
                { creatingAccount ? "Back to login" : "Create Account"}
            </a>
        </div>
    )
}

export default Login;