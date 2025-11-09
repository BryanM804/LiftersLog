import { SyntheticEvent, useState } from "react";
import ChatRoom from "../types/ChatRoom";
import InviteConfirmation from "./InviteConfirmation";
import ConfirmationBox from "../../../components/ConfirmationBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import changeUserChatPermission from "../api/changeUserChatPermission";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";

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
    const [isLeaving, setIsLeaving] = useState(false)

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;
    const queryClient = useQueryClient();

    const leaveMutation = useMutation({
        mutationFn: changeUserChatPermission,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatrooms"] })
        }
    })

    function leaveChat(e: SyntheticEvent) {
        if (room)
            leaveMutation.mutate({
                username: authUser.username,
                roomid: room.roomid,
                chatPermission: false
            })
            if (onBackClick) onBackClick(e);
            setIsLeaving(false);
    }
    
    if (type == "inRoom") {
        return (
            <div className="headerButtons">
                <button className="floatingButton" onClick={onBackClick}>Back</button>
                {
                    isOwner &&
                    <>
                        <button className="floatingButton" onClick={onEditChatRoom}>Edit Room</button>
                        <button className="floatingButton" onClick={() => setInvitingUser(true)}>Invite User</button>
                        {
                            (invitingUser && room) &&
                            <InviteConfirmation cancelFn={() => setInvitingUser(false)} room={room} />
                        }
                    </>
                }
                {
                    (!isOwner && room && room.roomid != 1) &&
                    <button className="floatingButton" onClick={() => setIsLeaving(true)}>Leave Chat</button>
                }
                {
                    isLeaving &&
                    <ConfirmationBox className="leaveConfirmation" confirmFn={leaveChat} cancelFn={() => setIsLeaving(false)} />
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