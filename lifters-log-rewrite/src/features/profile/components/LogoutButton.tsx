import { useNavigate } from "react-router-dom";


function LogoutButton() {

    const navigate = useNavigate();

    function handleLogout() {
        // PLACEHOLDER UNTIL AUTH SYSTEM IS MADE
        navigate("/");
    }

    return (
        <button id="logout" className="floatingButton" onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton;