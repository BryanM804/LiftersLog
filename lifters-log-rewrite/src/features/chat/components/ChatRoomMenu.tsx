import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import createChatRoom from "../api/createChatRoom";
import deleteChatRoom from "../api/deleteChatRoom";
import ChatRoom from "../types/ChatRoom";
import getUsersWithAccess from "../api/getUsersWithAccess";
import Loading from "../../../components/Loading";
import ChatUser from "./ChatUser";
import ServerError from "../../../components/ServerError";
import ConfirmationBox from "../../../components/ConfirmationBox";
import { isMobile } from "react-device-detect";

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
        queryKey: ["chatUsers", room?.roomid || 0], // room should always be defined if this runs
        queryFn: getUsersWithAccess
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
                <button className="floatingButton menuButton" onClick={cancelFunction} style={{position: "absolute", top: "0", left: "5%"}}>Back</button>
                <br /><br />
                <label htmlFor="chatRoomName">Room Name</label><br />
                <input id="chatRoomName" type="text" className="smallTextInput" value={roomName} onChange={handleTextChange} />
                <br />
                <label htmlFor="chatRoomDescription">Description</label><br />
                <textarea id="chatRoomDescription" className="longTextInput roomMenuTextArea" value={roomDescription} onChange={handleDescChange} />
                <br />
                <div className={ showingError ? "warningText" : "hidden"}>
                    { "Sorry, could not create chat room.\n" + hasError }
                </div>
                <div style={{position: "relative"}}>
                    {
                        type === "create" ?
                        <>
                            <button className="floatingButton menuButton" onClick={handleSubmit}>Create</button>
                        </>
                        :
                        <div>
                            <button className="floatingButton menuButton" 
                                onClick={handleSubmit}
                                style={{marginRight: "0.35rem"}}>Confirm</button>
                            <button className="floatingButton menuButton" onClick={() => setIsDeleting(true)}>Delete Room</button> 
                        </div>
                    }
                    {
                        isDeleting &&
                        <ConfirmationBox className="center" confirmFn={handleDelete} cancelFn={() => setIsDeleting(false)} />
                    }
                </div>
            </div>
            {
                (type === "edit" && isLoading) ? <Loading /> :
                (type === "edit" && error) ? <ServerError /> :
                (type === "edit" && room) &&
                <div className="chatMenuUserListContainer">
                    { isMobile ? <br /> : <></>}
                    Users:
                    <ul className="userList">
                        {
                            (data && data.length > 0) ?
                            data.map((usr: {Account: {username: string}}) => 
                                <ChatUser key={usr.Account.username} username={usr.Account.username} room={room} />
                            )
                            :
                            <>Nobody else but you {":("}</>
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default ChatRoomMenu;