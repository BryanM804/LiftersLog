import Chat from "../../features/chat/components/Chat";
import FriendActivity from "../../features/friends/components/FriendActivity";
import "../../features/chat/chat.css";
import "../../features/friends/friends.css";
import ChatReplyContextProvider from "../../features/chat/contexts/ChatReplyContext";

function Social() {
    return (
        <>
            <div className="mainContentPane">
                <ChatReplyContextProvider>
                    <Chat />
                    <FriendActivity />
                </ChatReplyContextProvider>
            </div>
        </>
    )
}

export default Social;