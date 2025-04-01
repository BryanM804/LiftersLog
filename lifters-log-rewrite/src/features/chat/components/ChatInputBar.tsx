import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import addChatMessage from "../api/addChatMessage";
import ChatRoom from "../types/ChatRoom";
import sendArrow from "../../../assets/send-arrow.png";
import { isMobile } from "react-device-detect";

type ChatInputBarProps = {
    room: ChatRoom;
}

function ChatInputBar({ room }: ChatInputBarProps) {
    const [chatMessage, setChatMessage] = useState("");

    const queryClient = useQueryClient();

    const chatMutation = useMutation({
        mutationFn: addChatMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat"] });
            setChatMessage("");
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