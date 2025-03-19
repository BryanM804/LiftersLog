import AuthChecker from "../../components/AuthChecker";
import Chat from "../../features/social/components/Chat";
import "../../features/social/social.css";

function Social() {
    return (
        <>
            <AuthChecker />
            <div className="mainContentPane">
                <h3 style={{marginBottom: "0"}}>Chat</h3>
                <div className="chatTopper">
                    <hr />
                    <Chat />
                </div>
            </div>
        </>
    )
}

export default Social;