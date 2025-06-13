import LogoutButton from "../../features/profile/components/LogoutButton";
import UserProfile from "../../features/profile/components/UserProfile";
import "../../features/profile/profile.css";
import "../../styles/xpbar.css"
import ProfileScreenFooter from "../../features/profile/components/ProfileScreenFooter";

function Profile() {
    return (
        <div className="mainContentPane">
            <UserProfile />
            <LogoutButton />
            <ProfileScreenFooter />
        </div>
    )
}

export default Profile;