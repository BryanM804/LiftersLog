import AuthChecker from "../../components/AuthChecker";
import Chat from "../../features/chat/components/Chat";
import FriendActivity from "../../features/friends/components/FriendActivity";
import "../../features/chat/chat.css";
import "../../features/friends/friends.css";

function Social() {
    return (
        <>
            <AuthChecker />
            <div className="mainContentPane">
                <Chat />
                <FriendActivity />
            </div>
        </>
    )
}

export default Social;