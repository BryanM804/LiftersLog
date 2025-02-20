
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

export default ChatMessage;