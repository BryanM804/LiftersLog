import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import addChatMessage from "../api/addChatMessage";
import ChatRoom from "../types/ChatRoom";
import sendArrow from "../../../assets/send-arrow.png";
import { isMobile } from "react-device-detect";
import FadePopup from "../../../components/FadePopup";
import { socket } from "../../../utils/socket";

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

        if (replyingMessageId > 0) {
            chatMutation.mutate({ text: chatMessage, roomid: room.roomid, repliesTo: replyingMessageId });
        } else {
            chatMutation.mutate({ text: chatMessage, roomid: room.roomid });
        }
    }

    // Clear the pending reply when the chat bar unloads
    useEffect(() => {
        return () => {
            clearReply()
        }
    }, [])

    return (
        <div className="chatInputBar">
            {
                error && <FadePopup text={error} duration={ERROR_DURATION} />
            }
            <div
                style={{display: "flex", flexDirection: "column"}}
            >
                {
                    replyingMessageId != 0 &&
                    <>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            Replying to:
                            <button
                                style={{right: "0"}}
                                onClick={clearReply}
                            >
                                Clear
                            </button>
                        </div>
                        <p>{replyingMessageText}</p>    
                    </>
                } 
                <form>
                    <input type="text" className="chatBar" value={chatMessage} onChange={handleChatChange} />
                    <button className="floatingButton chatSubmitButton" onClick={handleChatSubmit}>
                        <img src={sendArrow} height={ isMobile ? "16px" : "32px" } width={ isMobile ? "16px" : "32px" } />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatInputBar;