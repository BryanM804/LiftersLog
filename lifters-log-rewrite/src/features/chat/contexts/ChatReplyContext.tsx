import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

type ReplyType = "note" | "lift" | "cardio" | "label" | "message" | "";

type ChatReplyContextType = {
    replyingId: number,
    replyingText: string,
    replyType: ReplyType,
    originalUser: string,
    setReplyingId: Dispatch<SetStateAction<number>>,
    setReplyingText: Dispatch<SetStateAction<string>>,
    setReplyType: Dispatch<SetStateAction<ReplyType>>,
    setOriginalUser: Dispatch<SetStateAction<string>>
    clearReply: () => void;
}

type ChatReplyContextProps = {
    children: ReactNode;
}

const ChatReplyContext = createContext<ChatReplyContextType | undefined>(undefined)

function ChatReplyContextProvider({ children }: ChatReplyContextProps) {
    const [replyingId, setReplyingId] = useState(0)
    const [replyingText, setReplyingText] = useState("")
    const [replyType, setReplyType] = useState<ReplyType>("")
    const [originalUser, setOriginalUser] = useState("");

    function clearReply() {
        setReplyingId(0)
        setReplyingText("")
        setReplyType("")
        setOriginalUser("")
    }

    return (
        <ChatReplyContext.Provider
            value={{
                replyingId,
                setReplyingId,
                replyingText,
                setReplyingText,
                replyType,
                setReplyType,
                originalUser,
                setOriginalUser,
                clearReply
            }}
        >
            {children}
        </ChatReplyContext.Provider>
    )
}

export function useReplying(): ChatReplyContextType {
    const context = useContext(ChatReplyContext)

    if (!context) {
        throw new Error("useReplying must be used within a ChatReplyContextProvider")
    }

    return context;
}

export default ChatReplyContextProvider;