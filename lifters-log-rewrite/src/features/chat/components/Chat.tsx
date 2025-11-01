import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import ChatRoomList from "./ChatRoomList";
import ChatInputBar from "./ChatInputBar";
import ChatMessageList from "./ChatMessageList";
import ChatHeaderButtons from "./ChatHeaderButtons";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import ChatRoomMenu from "./ChatRoomMenu";
import ChatRoom from "../types/ChatRoom";
import { socket } from "../../../utils/socket";

type ChatTopperProps = {
    title?: string;
    children: ReactNode;
}

function ChatTopper({ title, children }: ChatTopperProps) {
    return (
        <>
            <div className="chatTopper">
                <h3>
                {
                    title ? title : "Chat"
                }
                </h3>
                <hr />
                {children}
            </div>
        </>
    )
}

function Chat() {

    const [activeChatRoom, setActiveChatRoom] = useState({} as ChatRoom)
    const [inChatRoom, setInChatRoom] = useState(false)
    const [creatingChatRoom, setCreatingChatRoom] = useState(false)
    const [editingChatRoom, setEditingChatRoom] = useState(false)

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    useEffect(() => {
        socket.connect();
        
        const prevChatRoom = localStorage.getItem("activeChatRoom")
        if (prevChatRoom) {
            handleChatroomChange(JSON.parse(prevChatRoom))
        }

        return () => {
            socket.off("message")
            socket.disconnect()
        }
    }, [])

    function handleBackClick(e: SyntheticEvent) {
        e.preventDefault();
        setInChatRoom(false);
        localStorage.removeItem("activeChatRoom");
    }

    function handleChatroomChange(r: ChatRoom) {
        socket.connect()
        socket.emit("enter room", r.roomid)

        setActiveChatRoom(r);
        setInChatRoom(true);
        localStorage.setItem("activeChatRoom", JSON.stringify(r));
    }

    if (creatingChatRoom) {
        return (
            <ChatTopper>
                <div className="chatBox">
                    <ChatRoomMenu cancelFunction={() => setCreatingChatRoom(false)} type="create" />
                </div>
            </ChatTopper>
        )
    }

    if (editingChatRoom) {
        return (
            <ChatTopper title={activeChatRoom.name}>
                <div className="chatBox">
                    <ChatRoomMenu cancelFunction={() => setEditingChatRoom(false)} 
                        type="edit" 
                        room={activeChatRoom}
                        />
                </div>
            </ChatTopper>
        )
    }

    if (inChatRoom) {
        return (
            <ChatTopper title={activeChatRoom.name}>
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
            </ChatTopper>
        )
    }

    return (
        <ChatTopper>
            <div className="chatBox">
                <ChatHeaderButtons type="roomList" onCreateChatRoom={() => setCreatingChatRoom(true)}/>
                <ChatRoomList 
                    setActiveChatRoom={handleChatroomChange}
                    />
            </div>
        </ChatTopper>
    )
}

export default Chat;