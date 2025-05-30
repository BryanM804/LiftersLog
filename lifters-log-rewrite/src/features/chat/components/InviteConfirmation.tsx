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
        <>
        <div className="backgroundDim" onClick={cancelFn} ></div>
        <div className="chatSubMenu">
            <input type="text" value={invitedUser} className="smallTextInput" onChange={handleTextChange}
                placeholder="Username"
            />
            <br />
            <div style={{display: "flex", gap: "0.3rem", marginTop: "0.5rem"}} className="center">
                <button onClick={handleConfirmation} className="floatingButton menuButton">Confirm</button>
                <button onClick={cancelFn} className="floatingButton menuButton">Cancel</button>
            </div>
            <div className={ error ? "warningText" : "hidden"}>Invalid User</div>
        </div>
        </>
    )
}

export default InviteConfirmation