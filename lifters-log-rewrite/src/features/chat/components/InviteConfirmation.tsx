import { ChangeEvent, useState } from "react";
import ChatRoom from "../types/ChatRoom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addChatMessage from "../api/addChatMessage";
import changeUserChatPermission from "../api/changeUserChatPermission";
import FadePopup from "../../../components/FadePopup";
import PopupMenu from "../../../components/PopupMenu";

type InviteConfirmationProps = {
    cancelFn: () => void;
    room: ChatRoom;
}

const ERROR_DURATION = 1.5

function InviteConfirmation({ cancelFn, room }: InviteConfirmationProps) {
    
    const [error, setError] = useState("")
    const [invitedUser, setInvitedUser] = useState(""); // Needs a state just for the confirmation message in chat

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
        onError: (error: Error) => {
            setError(error.message)
            setTimeout(() => {
                setError("")
            }, ERROR_DURATION * 1000)
        }
    })

    function handleConfirmation() {
        if (invitedUser != "") {
            inviteUserMutation.mutate({ username: invitedUser, chatPermission: true, roomid: room.roomid });
        }
    }
    
    return (
        <>
            {
                error && <FadePopup text={error} duration={ERROR_DURATION} />
            }
            <PopupMenu
                title="Invite User"
                onSubmit={handleConfirmation}
                onCancel={cancelFn}
                confirmButtonText="Invite"
            >
                <input 
                    type="text"
                    value={invitedUser}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInvitedUser(e.target.value)}
                    placeholder="Username"
                    className="smallTextInput"
                />
            </PopupMenu>
        </>
    )
}

export default InviteConfirmation