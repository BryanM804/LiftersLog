import LogoutButton from "../../features/profile/components/LogoutButton";
import AuthChecker from "../../components/AuthChecker";
import UserProfile from "../../features/profile/components/UserProfile";
import "../../features/profile/profile.css";

function Profile() {
    return (
        <div className="mainContentPane">
            <AuthChecker />
                <div className="mainContentPane">
                    <UserProfile />
                </div>
            <LogoutButton></LogoutButton>
        </div>
    )
}

export default Profile;