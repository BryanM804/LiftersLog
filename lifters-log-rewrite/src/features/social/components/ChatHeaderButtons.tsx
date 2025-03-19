import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import changeUserChatPermission from "../api/changeUserChatPermission";
import addChatMessage from "../api/addChatMessage";
import ChatRoom from "../types/ChatRoom";

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


type InviteConfirmationProps = {
    cancelFn: () => void;
    room: ChatRoom;
}

function InviteConfirmation({ cancelFn, room }: InviteConfirmationProps) {
    
    const [invitedUser, setInvitedUser] = useState("")
    const [error, setError] = useState(false)

    const queryClient = useQueryClient();

    const addChatMessageMutation = useMutation({
        mutationFn: addChatMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["chat"] })
        }
    })

    const inviteUserMutation = useMutation({
        mutationFn: changeUserChatPermission,
        onSuccess: () => {
            addChatMessageMutation.mutate({ roomid: room.roomid, text: `Added ${invitedUser} to ${room.name}.` })
            cancelFn();
        },
        onError: () => {
            setError(true)
        }
    })

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        setInvitedUser(e.target.value);
    }

    function handleConfirmation() {
        if (invitedUser != "") {
            inviteUserMutation.mutate({ username: invitedUser, chatPermission: true, roomid: room.roomid })
        }
    }
    
    return (
        <div className="chatSubMenu" style={{textAlign: "center"}}>
            <input type="text" value={invitedUser} className="smallTextInput" onChange={handleTextChange}/>
            <button onClick={handleConfirmation} className="floatingButton">Confirm</button>
            <button onClick={cancelFn} className="floatingButton">Cancel</button>
            <div className={ error ? "errorText" : "hidden"}>Server Error.</div>
        </div>
    )
}