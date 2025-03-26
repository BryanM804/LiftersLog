import { SyntheticEvent, useState } from "react";
import ChatRoom from "../types/ChatRoom";
import InviteConfirmation from "./InviteConfirmation";

type ChatHeaderButtonsProps = {
    onBackClick?: (e: SyntheticEvent) => void;
    onCreateChatRoom?: () => void;
    onEditChatRoom?: () => void;
    isOwner?: boolean;
    type: string;
    room?: ChatRoom;
}

function ChatHeaderButtons({ onBackClick, onCreateChatRoom, onEditChatRoom, isOwner, type, room }: ChatHeaderButtonsProps) {

    const [invitingUser, setInvitingUser] = useState(false)
    
    if (type == "inRoom") {
        return (
            <div className="headerButtons">
                <button className="floatingButton" onClick={onBackClick}>Back</button>
                {
                    isOwner &&
                    <>
                        <button className="floatingButton" style={{marginLeft: "0.5rem"}} onClick={onEditChatRoom}>Edit Room</button>
                        <button className="floatingButton" style={{marginLeft: "0.5rem"}} onClick={() => setInvitingUser(true)}>Invite User</button>
                        {
                            (invitingUser && room) &&
                            <InviteConfirmation cancelFn={() => setInvitingUser(false)} room={room} />
                        }
                    </>
                }
            </div>
        )
    } else if (type == "roomList") {
        return (
            <div className="headerButtons">
                <button className="floatingButton" onClick={onCreateChatRoom}>Create Room</button>
            </div>
        )
    }
    
}

export default ChatHeaderButtons;