import { SyntheticEvent, useState } from "react";
import ChatRoomList from "./ChatRoomList";
import ChatInputBar from "./ChatInputBar";
import ChatMessageList from "./ChatMessageList";
import ChatHeaderButtons from "./ChatHeaderButtons";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import ChatRoomMenu from "./ChatRoomMenu";
import ChatRoom from "../types/ChatRoom";


function Chat() {

    const [activeChatRoom, setActiveChatRoom] = useState({} as ChatRoom)
    const [inChatRoom, setInChatRoom] = useState(false)
    const [creatingChatRoom, setCreatingChatRoom] = useState(false)
    const [editingChatRoom, setEditingChatRoom] = useState(false)

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    function handleBackClick(e: SyntheticEvent) {
        e.preventDefault();
        setInChatRoom(false);
    }

    if (creatingChatRoom) {
        return (
            <div className="chatBox">
                <ChatRoomMenu cancelFunction={() => setCreatingChatRoom(false)} type="create" />
            </div>
        )
    }

    if (editingChatRoom) {
        return (
            <div className="chatBox">
                <ChatRoomMenu cancelFunction={() => setEditingChatRoom(false)} 
                    type="edit" 
                    room={activeChatRoom}
                    />
            </div>
        )
    }

    if (inChatRoom) {
        return (
            <div className="chatBox">
                <ChatHeaderButtons type="inRoom" 
                    onBackClick={handleBackClick} 
                    isOwner={activeChatRoom.creatorid == authUser.userid} 
                    onEditChatRoom={() => setEditingChatRoom(true)}
                    room={activeChatRoom}
                />
                <ChatMessageList room={activeChatRoom} />
                <ChatInputBar room={activeChatRoom} />
            </div>
        )
    }

    return (
        <div className="chatBox">
            <ChatHeaderButtons type="roomList" onCreateChatRoom={() => setCreatingChatRoom(true)}/>
            <ChatRoomList 
                setInChatRoom={setInChatRoom} 
                setActiveChatRoom={setActiveChatRoom}
                />
        </div>
    )
}

export default Chat;