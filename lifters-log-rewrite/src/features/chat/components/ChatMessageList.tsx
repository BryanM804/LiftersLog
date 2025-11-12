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
}

function ChatMessageList({ room }: ChatMessageListProps) {

    const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
    const [scrollAtBottom, setScrollAtBottom] = useState(true);

    const { data: chatHistory, error, isLoading } = useQuery({
        queryKey: ["chat", room.roomid],
        queryFn: getChatMessages
    })

    const messageList = useRef<HTMLUListElement>(null);

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
                    chatMessages.map((msg: ChatMessageType) => {
                        let repliesTo;

                        if (msg.ReplyTo) {
                            repliesTo = { 
                                author: msg.ReplyTo.Account.username, 
                                message: msg.ReplyTo.message, 
                                type: msg.replyType 
                            }
                        } else if (msg.LiftReply) {
                            const { movement, weight, reps, subweight, subreps } = msg.LiftReply

                            repliesTo = { 
                                author: `${msg.LiftReply.Account.username} logged ${movement}`, 
                                message: `${subweight ? "L: " : ""}${weight}lbs for ${reps} reps${subweight ? `\nR: ${subweight}lbs for ${subreps} reps` : ""}`, 
                                type: msg.replyType 
                            }
                        } else if (msg.NoteReply) {
                            repliesTo = { 
                                author: `${msg.NoteReply.Account.username} added a note to ${msg.NoteReply.movement}`, 
                                message: msg.NoteReply.text, 
                                type: msg.replyType 
                            }
                        } else if (msg.CardioReply) {
                            const { movement, cardiotime, distance, note } = msg.CardioReply
                            repliesTo = { 
                                author: `${msg.CardioReply.Account.username} logged ${movement}`, 
                                message: `${cardiotime} minutes${distance ? `, ${distance} miles.` : ""}${note ? `\n${note}` : ""}`, 
                                type: msg.replyType 
                            }
                        } else if (msg.LabelReply) {
                            const { label, date } = msg.LabelReply;
                            const localeDate = new Date(date).toLocaleDateString();
                            repliesTo = { 
                                author: `${msg.LabelReply.Account.username} set a label for ${localeDate}`, 
                                message: `"${label}"`, 
                                type: msg.replyType 
                            }
                        } else {
                            repliesTo = undefined;
                        }

                        return (
                            <ChatMessage 
                                cid={msg.cid}
                                msg={msg.message} 
                                author={msg.Account.username} 
                                time={msg.time} 
                                date={msg.date}
                                key={msg.cid}
                                repliesTo={repliesTo}
                            />
                        )
                    })
                    :
                    <li className="darkFont">It's empty in here... Send a message to get chatting {":)"}</li>
                }
            </ul>
        </>
    )
}
export default ChatMessageList