import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import createChatRoom from "../api/createChatRoom";
import deleteChatRoom from "../api/deleteChatRoom";
import ChatRoom from "../types/ChatRoom";
import DeleteButton from "../../../components/DeleteButton";
import changeUserChatPermission from "../api/changeUserChatPermission";
import getUsersWithAccess from "../api/getUsersWithAccess";
import Loading from "../../../components/Loading";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";

type ChatRoomMenuProps = {
    type: string;
    cancelFunction: VoidFunction;
    room?: ChatRoom;
}

function ChatRoomMenu({ type, cancelFunction, room }: ChatRoomMenuProps) {

    const queryClient = useQueryClient();

    const [roomName, setRoomName] = useState(room?.name || "")
    const [roomDescription, setRoomDescription] = useState(room?.description || "")
    const [showingError, setShowingError] = useState(false)
    const [hasError, setHasError] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    const chatRoomMutation = useMutation({
        mutationFn: createChatRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatrooms"] });
            cancelFunction();
        },
        onError: (error) => {
            setShowingError(true)
            setHasError(error.toString())
        }
    });

    const deleteRoomMutation = useMutation({
        mutationFn: deleteChatRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatrooms"] });
            cancelFunction();
        }
    })

    const { data, error, isLoading } = useQuery({
        queryKey: ["chatUsers"],
        queryFn: () => getUsersWithAccess(room?.roomid || 0) // room should always be defined if this runs
    })

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id === "chatRoomName") {
            setRoomName(e.target.value)
        }
    }

    function handleDescChange(e: ChangeEvent<HTMLTextAreaElement>) {
        if (e.target.id === "chatRoomDescription") {
            setRoomDescription(e.target.value)
        }
    }

    function handleSubmit() {
        if (roomName != "") {
            if (type === "create") {
                chatRoomMutation.mutate({ name: roomName, description: roomDescription, newRoom: true });
            } else if (room?.roomid) {
                chatRoomMutation.mutate({ name: roomName, description: roomDescription, newRoom: false, roomid: room.roomid });
            }
        }
    }

    function handleDelete() {
        if (room?.roomid) {
            console.log(room.roomid)
            deleteRoomMutation.mutate({roomid: room.roomid})
        }
    }

    return (
        <div className="chatRoomMenu">
            <div>
                Room Name <br />
                <input id="chatRoomName" type="text" className="smallTextInput" value={roomName} onChange={handleTextChange} />
                <br />
                Description <br />
                <textarea id="chatRoomDescription" className="longTextInput roomMenuTextArea" value={roomDescription} onChange={handleDescChange} />
                <br />
                <div className={ showingError ? "warningText" : "hidden"}>
                    { "Sorry, could not create chat room.\n" + hasError }
                </div>
                <div style={{position: "relative"}}>
                    {
                        type === "create" ?
                        <>
                            <button className="floatingButton" onClick={handleSubmit}>Create</button>
                        </>
                        :
                        <>
                            <button className="floatingButton" onClick={handleSubmit}>Confirm</button>
                            <button className="floatingButton" onClick={() => setIsDeleting(true)}>Delete Room</button> 
                        </>
                    }
                    {
                        isDeleting &&
                        <div className="confirmationBox center">
                            <div className="confirmationText">Are you sure?</div>
                            <button className="smallFloatingButton" onClick={handleDelete}>✅</button>
                            <button className="smallFloatingButton" onClick={() => setIsDeleting(false)}>❌</button>
                        </div>
                    }
                    <button className="floatingButton" onClick={cancelFunction}>Cancel</button>
                </div>
            </div>
            {
                (type === "edit" && room && !isLoading) ? 
                <div style={{gridColumn: "2"}}>
                    Users:
                    <ul className="userList">
                        {
                            (data && data.length > 0) ?
                            data.map((usr: {Account: {username: string}}) => 
                                <ChatUser username={usr.Account.username} room={room} />
                            )
                            :
                            <>Nobody else but you {":("}</>
                        }
                    </ul>
                </div>
                :
                isLoading && <Loading />
            }
        </div>
    )
}

export default ChatRoomMenu;


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