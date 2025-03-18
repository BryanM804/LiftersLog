import AuthChecker from "../../components/AuthChecker";
import Chat from "../../features/social/components/Chat";
import "../../features/social/social.css";

function Social() {
    return (
        <>
            <AuthChecker />
            <div className="mainContentPane">
                <Chat />
            </div>
        </>
    )
}

export default Social;