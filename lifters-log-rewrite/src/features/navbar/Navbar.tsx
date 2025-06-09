import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import loggingPic from "../../assets/log.png"
import historyPic from "../../assets/history.png"
import socialPic from "../../assets/social.png"
import profilePic from "../../assets/profile.png"

function Navbar() {
    const location = useLocation();

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(location.pathname != "/" && location.pathname != "/welcome")
    }, [location])

    return (
        <nav className={visible ? "navbar" : "navbar hidden"}>
            <ul>
                <NavLink to="/logging" end className={({ isActive }) => (isActive ? "active navlink" : "navlink")}>
                    <img src={loggingPic} height={32} width={36} />
                </NavLink>
                <NavLink to="/history" end className={({ isActive }) => (isActive ? "active navlink" : "navlink")}>
                    <img src={historyPic} height={32} width={36} />
                </NavLink>
                <NavLink to="/social" end className={({ isActive }) => (isActive ? "active navlink" : "navlink")}>
                    <img src={socialPic} height={32} width={38} />
                </NavLink>
                <NavLink to="/profile" end className={({ isActive }) => (isActive ? "active navlink" : "navlink")}>
                    <img src={profilePic} height={32} width={32} />
                </NavLink>
            </ul>
        </nav>
    );
}

export default Navbar;