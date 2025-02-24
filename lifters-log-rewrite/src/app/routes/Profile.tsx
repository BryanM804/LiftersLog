import LogoutButton from "../../features/profile/components/LogoutButton";
import AuthChecker from "../../components/AuthChecker";
import UserProfile from "../../features/profile/components/UserProfile";


function Profile() {
    return (
        <div className="mainContentPane">
            <AuthChecker />
            <UserProfile />
            <LogoutButton></LogoutButton>
        </div>
    )
}

export default Profile;