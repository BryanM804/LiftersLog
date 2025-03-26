import { useState } from "react";
import ChatRoom from "../types/ChatRoom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import changeUserChatPermission from "../api/changeUserChatPermission";
import DeleteButton from "../../../components/DeleteButton";

type ChatUserProps = {
    username: string;
    room: ChatRoom;
}

function ChatUser({ username, room }: ChatUserProps) {

    const [hovering, setHovering] = useState(false)

    const queryClient = useQueryClient();
    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    const removeUserMutation = useMutation({
        mutationFn: changeUserChatPermission,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatUsers"] })
        }
    })

    function handleDelete() {
        // Make EXTRA sure the user cannot delete themself
        if (username != authUser.username)
            removeUserMutation.mutate({ username: username, chatPermission: false, roomid: room.roomid })
    }

    return (
        <li className="chatUser"
            style={{position: "relative"}} 
            onPointerEnter={() => setHovering(true)} 
            onPointerLeave={() => setHovering(false)}
            >
            {username}
            {
                // Make sure the user can't delete themself and make a phantom chat room
                username != authUser.username && <DeleteButton onDelete={handleDelete} show={hovering} />
            }
        </li>
    )
}

export default ChatUser