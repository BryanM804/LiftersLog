import { NavLink } from "react-router-dom";

interface NavbarProps {
    visible: boolean
}

function Navbar({ visible }: NavbarProps) {
    return (
        <nav className={visible ? "navbar" : "navbar hidden"}>
            <ul>
                <NavLink to="/logging" end className={({ isActive }) => (isActive ? "active navlink" : "navlink")} >Logging</NavLink>
                <NavLink to="/history" end className={({ isActive }) => (isActive ? "active navlink" : "navlink")}>History</NavLink>
                <NavLink to="/social" end className={({ isActive }) => (isActive ? "active navlink" : "navlink")}>Social</NavLink>
            </ul>
            <NavLink to="/profile" end className={({ isActive }) => (isActive ? "active navlink" : "navlink")}>Profile</NavLink>
        </nav>
    );
}

export default Navbar;