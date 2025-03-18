import { useState } from "react";
import ChatRoomList from "./ChatRoomList";
import ChatInputBar from "./ChatInputBar";
import ChatMessageList from "./ChatMessageList";


function Chat() {

    const [activeChatRoom, setActiveChatRoom] = useState(0)
    const [inChatRoom, setInChatRoom] = useState(false)

    return (
        <div className="chatBox">
            {
                !inChatRoom ?
                    <ChatRoomList setActiveChatRoom={setActiveChatRoom} setInChatRoom={setInChatRoom} />                
                :
                    <>
                        <ChatMessageList roomid={activeChatRoom}/>
                        <ChatInputBar roomid={activeChatRoom}/>
                    </>
            }
        </div>
    )
}

export default Chat;