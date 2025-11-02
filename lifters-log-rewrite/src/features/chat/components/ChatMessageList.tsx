import { useQuery } from "@tanstack/react-query"
import getChatMessages from "../api/getChatMessages"
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef, useState } from "react";
import ChatRoom from "../types/ChatRoom";
import ChatMessageType from "../types/ChatMessage";
import { socket } from "../../../utils/socket";

type ChatMessageListProps = {
    room: ChatRoom;
    setReplyingMessageId: (rid: number) => void;
    setReplyingMessageText: (text: string) => void;
}

function ChatMessageList({ room, setReplyingMessageId, setReplyingMessageText }: ChatMessageListProps) {

    const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([])

    const { data: chatHistory, error, isLoading } = useQuery({
        queryKey: ["chat", room.roomid],
        queryFn: getChatMessages
    })

    const messageList = useRef<HTMLUListElement>(null);

    const [scrollAtBottom, setScrollAtBottom] = useState(true);

    // Load initial chat history
    useEffect(() => {
        setChatMessages(chatHistory)
    }, [chatHistory])

    // Set handlers on the socket for any incoming chat messages
    useEffect(() => {
        socket.on("message", (newMessage: ChatMessageType) => {
            setChatMessages((prev) => [...prev, newMessage])
        })

        return () => {
            socket.off("message")
        }
    }, [])

    useEffect(() => {
        // Set the scrollbar to the bottom when a new message appears
        // Unless the user has the scrollbar in a different position
        if (messageList.current && scrollAtBottom) {
            messageList.current.scrollTop = messageList.current.scrollHeight
        }
    }, [chatMessages])

    function handleScrollPosition() {
        if (messageList.current) {
            if (messageList.current.scrollTop + messageList.current.clientHeight >= messageList.current.scrollHeight - 10) {
                setScrollAtBottom(true)
            } else {
                setScrollAtBottom(false)
            }
        }
    }

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error}/>

    return (
        <>
            <ul className="chatMessageList" ref={messageList} onScroll={handleScrollPosition}>
                {
                    chatMessages?.length > 0 ?
                    chatMessages.map((msg: ChatMessageType) => 
                        <ChatMessage 
                            cid={msg.cid}
                            msg={msg.message} 
                            author={msg.Account.username} 
                            time={msg.time} 
                            date={msg.date}
                            key={msg.cid}
                            repliesTo={msg.ReplyTo ? `${msg.ReplyTo.Account.username}: ${msg.ReplyTo.message}` : undefined}
                            setReplyingMessageId={setReplyingMessageId}
                            setReplyingMessageText={setReplyingMessageText}
                        />
                    )
                    :
                    <li className="darkFont">It's empty in here... Send a message to get chatting {":)"}</li>
                }
            </ul>
        </>
    )
}
export default ChatMessageList