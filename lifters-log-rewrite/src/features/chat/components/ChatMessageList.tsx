import { useQuery } from "@tanstack/react-query"
import getChatMessages from "../api/getChatMessages"
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef, useState } from "react";
import ChatRoom from "../types/ChatRoom";

type ChatMessageListProps = {
    room: ChatRoom;
}

function ChatMessageList({ room }: ChatMessageListProps) {

    const { data, error, isLoading } = useQuery({
        queryKey: ["chat", room.roomid],
        queryFn: () => getChatMessages(room.roomid),
        refetchInterval: 3000
    })

    const messageList = useRef<HTMLUListElement>(null);

    const [scrollAtBottom, setScrollAtBottom] = useState(true);

    useEffect(() => {
        // Set the scrollbar to the bottom when a new message appears
        // Unless the user has the scrollbar in a different position
        if (messageList.current && scrollAtBottom) {
            messageList.current.scrollTop = messageList.current.scrollHeight
        }
    }, [data])

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
                    data.length > 0 ?
                    data.map((msg: {message: string; time: string; cid: number; date: string; Account: {username: string}}) => 
                        <ChatMessage 
                            msg={msg.message} 
                            author={msg.Account.username} 
                            time={msg.time} 
                            date={msg.date}
                            key={msg.cid}/>
                    )
                    :
                    <li className="darkFont">It's empty in here... Send a message to get chatting {":)"}</li>
                }
            </ul>
        </>
    )
}
export default ChatMessageList