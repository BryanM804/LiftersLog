import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";


function LogoutButton() {

    const navigate = useNavigate();
    const signOut = useSignOut();

    function handleLogout() {
        signOut();
        navigate("/");
    }

    return (
        <button id="logout" className="floatingButton" onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton;