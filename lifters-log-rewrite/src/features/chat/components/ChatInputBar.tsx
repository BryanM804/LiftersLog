import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import addChatMessage from "../api/addChatMessage";
import ChatRoom from "../types/ChatRoom";
import sendArrow from "../../../assets/send-arrow.png";
import { isMobile } from "react-device-detect";
import FadePopup from "../../../components/FadePopup";
import { socket } from "../../../utils/socket";
import getUsersWithAccess from "../api/getUsersWithAccess";

type ChatInputBarProps = {
    room: ChatRoom;
    replyingMessageId: number;
    replyingMessageText: string;
    clearReply: () => void;
}

const ERROR_DURATION = 1.5

function ChatInputBar({ room, replyingMessageId, replyingMessageText, clearReply }: ChatInputBarProps) {
    const [chatMessage, setChatMessage] = useState("");
    const [error, setError] = useState("")

    const queryClient = useQueryClient();

    const { data: userList, error: listError, isLoading } = useQuery({
        queryKey: ["chatUsers", room.roomid],
        queryFn: getUsersWithAccess
    })

    const chatMutation = useMutation({
        mutationFn: addChatMessage,
        onSuccess: (data: {message: string, newMessageId: number}) => {
            queryClient.invalidateQueries({ queryKey: ["chat"] });

            socket.emit("message", { roomId: room.roomid, msgId: data.newMessageId });

            setChatMessage("");
            clearReply();
        },
        onError: (error: Error) => {
            setError(error.message)
            setTimeout(() => {
                setError("")
            }, ERROR_DURATION * 1000)
        }
    })

    function handleChatChange(e: ChangeEvent<HTMLInputElement>) {
        setChatMessage(e.target.value);
    }

    function handleChatSubmit(e: SyntheticEvent) {
        e.preventDefault();
        if (chatMessage === "") return

        const pendingChatMessage: {text: string, roomid: number, repliesTo?: number, pingedUsers?: string[]} = {
            text: chatMessage,
            roomid: room.roomid
        }

        if (replyingMessageId > 0) {
            pendingChatMessage.repliesTo = replyingMessageId;
        }

        if (userList) {
            for (const user of userList) {
                const possibleUsername = user.Account.username;
                const prevPingedUsers = pendingChatMessage.pingedUsers

                if (chatMessage.includes(`@${possibleUsername}`)) {
                    pendingChatMessage.pingedUsers = prevPingedUsers ? [...prevPingedUsers, possibleUsername] : [possibleUsername];
                }
            }
        }

        chatMutation.mutate(pendingChatMessage)
    }

    // Clear the pending reply when the chat bar unloads
    useEffect(() => {
        return () => {
            clearReply()
        }
    }, [])

    return (
        <div className="chatBar">
            {
                error && <FadePopup text={error} duration={ERROR_DURATION} />
            }
            {
                replyingMessageId != 0 &&
                <>
                    <div className="replyingToPrompt">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            Replying to:
                            <button
                                style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "rgb(180, 60, 60)",
                                    fontSize: "1.2rem"
                                }}
                                onClick={clearReply}
                            >
                                X
                            </button>
                        </div>
                        <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                            {replyingMessageText}
                        </div>
                    </div>
                </>
            } 
            <form className="chatInputBarContainer">
                <input type="text" className="chatInputBar" value={chatMessage} onChange={handleChatChange} />
                <button className="chatSubmitButton floatingButton" onClick={handleChatSubmit}>
                    <img src={sendArrow} height={ isMobile ? "16px" : "32px" } width={ isMobile ? "16px" : "32px" } />
                </button>
            </form>
        </div>
    )
}

export default ChatInputBar;