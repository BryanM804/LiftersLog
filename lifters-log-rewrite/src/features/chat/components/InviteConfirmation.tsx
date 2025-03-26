import { ChangeEvent, useState } from "react";
import ChatRoom from "../types/ChatRoom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addChatMessage from "../api/addChatMessage";
import changeUserChatPermission from "../api/changeUserChatPermission";

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
            <br />
            <button onClick={handleConfirmation} className="floatingButton">Confirm</button>
            <button onClick={cancelFn} className="floatingButton">Cancel</button>
            <div className={ error ? "warningText" : "hidden"}>Invalid User</div>
        </div>
    )
}

export default InviteConfirmation