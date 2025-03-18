import { useQuery } from "@tanstack/react-query"
import getChatMessages from "../api/getChatMessages"
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";

type ChatMessageListProps = {
    roomid: number;
}

function ChatMessageList({ roomid }: ChatMessageListProps) {

    const { data, error, isLoading } = useQuery({
        queryKey: ["chat", roomid],
        queryFn: () => getChatMessages(roomid)
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error}/>

    return (
        <>
            <ul className="chatMessageList">
                {
                    data.length > 0 ?
                    data.map((msg: {message: string; time: string; cid: number; Account: {username: string}}) => 
                        <ChatMessage 
                            msg={msg.message} 
                            author={msg.Account.username} 
                            time={msg.time} 
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


type ChatMessageProps = {
    msg: string;
    author: string;
    time: string;
}

function ChatMessage({ msg, author, time }: ChatMessageProps) {
    return (
        <>
        <li>
            [{time}] {author}: {msg}
        </li>
        </>
    )
}