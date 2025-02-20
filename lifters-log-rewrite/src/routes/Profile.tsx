import { useState } from "react";
import XpBar from "../components/XpBar";
import LogoutButton from "../features/profile/components/LogoutButton";


function Profile() {

    // Get from database later
    const [currentXp, setCurrentXp] = useState(100);
    const [maxXp, setMaxXp] = useState(1000);



    return (
        <div className="mainContentPane">
            <XpBar value={currentXp} max={maxXp}/>
            <LogoutButton></LogoutButton>
        </div>
    )
}

export default Profile;