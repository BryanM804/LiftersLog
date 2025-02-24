import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import addChatMessage from "../api/addChatMessage";

type ChatInputBarProps = {
    roomid: number;
}

function ChatInputBar({ roomid }: ChatInputBarProps) {
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
        chatMutation.mutate({ text: chatMessage, roomid: roomid });
    }

    return (
        <div className="chatInputBar">
            <form>
                <input type="text" className="chatBar" value={chatMessage} onChange={handleChatChange} />
                <input type="submit" value="Send" onClick={handleChatSubmit} />
            </form>
        </div>
    )
}

export default ChatInputBar;