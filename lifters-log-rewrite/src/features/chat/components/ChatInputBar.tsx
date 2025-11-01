import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import addChatMessage from "../api/addChatMessage";
import ChatRoom from "../types/ChatRoom";
import sendArrow from "../../../assets/send-arrow.png";
import { isMobile } from "react-device-detect";
import FadePopup from "../../../components/FadePopup";
import { socket } from "../../../utils/socket";

type ChatInputBarProps = {
    room: ChatRoom;
}

const ERROR_DURATION = 1.5

function ChatInputBar({ room }: ChatInputBarProps) {
    const [chatMessage, setChatMessage] = useState("");
    const [error, setError] = useState("")

    const queryClient = useQueryClient();

    const chatMutation = useMutation({
        mutationFn: addChatMessage,
        onSuccess: (data: {message: string, newMessageId: number}) => {
            queryClient.invalidateQueries({ queryKey: ["chat"] });

            socket.emit("message", { roomId: room.roomid, msgId: data.newMessageId });

            setChatMessage("");
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

        chatMutation.mutate({ text: chatMessage, roomid: room.roomid });
    }

    return (
        <div className="chatInputBar">
            {
                error && <FadePopup text={error} duration={ERROR_DURATION} />
            }
            <form>
                <input type="text" className="chatBar" value={chatMessage} onChange={handleChatChange} />
                <button className="floatingButton chatSubmitButton" onClick={handleChatSubmit}>
                    <img src={sendArrow} height={ isMobile ? "16px" : "32px" } width={ isMobile ? "16px" : "32px" } />
                </button>
            </form>
        </div>
    )
}

export default ChatInputBar;