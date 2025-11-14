import { SyntheticEvent, useEffect, useState } from "react";
import ChatRoom from "../types/ChatRoom";
import InviteConfirmation from "./InviteConfirmation";
import ConfirmationBox from "../../../components/ConfirmationBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import changeUserChatPermission from "../api/changeUserChatPermission";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import { AnimatePresence, motion, useAnimation } from "framer-motion";


type ChatHeaderButtonsProps = {
    onBackClick?: (e: SyntheticEvent) => void;
    onCreateChatRoom?: () => void;
    onEditChatRoom?: () => void;
    isOwner?: boolean;
    type: string;
    room?: ChatRoom;
}

function ChatHeaderButtons({ onBackClick, onCreateChatRoom, onEditChatRoom, isOwner, type, room }: ChatHeaderButtonsProps) {
    const OPENING_DURATION = 0.25;

    const initialDiv = {
        width: "5%",
        transform: "translateX(50vw)"
    };
    const animateDiv = {
        width: "100%",
        transform: "translateX(0vw)"
    }

    const [invitingUser, setInvitingUser] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)
    const [barOpen, setBarOpen] = useState(false)

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;
    const queryClient = useQueryClient();
    const buttonControls = useAnimation();


    const leaveMutation = useMutation({
        mutationFn: changeUserChatPermission,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatrooms"] })
        }
    })

    useEffect(() => {
        function showButtons() {
            buttonControls.start({
                display: "block",
                transition: { duration: 0 }
            })
        }

        if (barOpen) {
            showButtons()
        } else {
            setTimeout(() => {
                showButtons()
                setBarOpen(true);
            }, OPENING_DURATION * 1000)
        }

        // The update on isOwner is so that the extra buttons don't stay invisible
    }, [isOwner])

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
            <>
                <AnimatePresence>
                    <motion.div
                        className="chatHeaderBar"
                        initial={initialDiv}
                        animate={animateDiv}
                        transition={{ duration: OPENING_DURATION }}
                    >
                        <motion.button animate={buttonControls} className="chatHeaderButton" onClick={onBackClick}>Back</motion.button>
                        {
                            isOwner &&
                            <>
                                <motion.button animate={buttonControls} className="chatHeaderButton" onClick={onEditChatRoom}>Edit Room</motion.button>
                                <motion.button animate={buttonControls} className="chatHeaderButton" onClick={() => setInvitingUser(true)}>Invite User</motion.button>
                            </>
                        }
                        {
                            (!isOwner && room && room.roomid != 1) &&
                            <motion.button animate={buttonControls} className="chatHeaderButton" onClick={() => setIsLeaving(true)}>Leave Chat</motion.button>
                        }
                        
                    </motion.div>
                </AnimatePresence>
                {
                    (invitingUser && room) &&
                    <InviteConfirmation cancelFn={() => setInvitingUser(false)} room={room} />
                }
                {
                    isLeaving &&
                    <ConfirmationBox className="leaveConfirmation" text="Are you sure you want to leave?" confirmFn={leaveChat} cancelFn={() => setIsLeaving(false)} />
                }
            </>
        )
    } else if (type == "roomList") {
        return (
            <AnimatePresence>
                <motion.div
                    className="chatHeaderBar"
                    initial={initialDiv}
                    animate={animateDiv}
                    transition={{ duration: OPENING_DURATION }}
                >
                    <motion.button animate={buttonControls} className="chatHeaderButton" onClick={onCreateChatRoom}>Create Room</motion.button>
                </motion.div>
            </AnimatePresence>
        )
    }
    
}

export default ChatHeaderButtons;