
type ChatRoomItemProps = {
    name: string;
    description?: string;
    onClick: VoidFunction;
}

function ChatRoomItem({ name, description, onClick }: ChatRoomItemProps) {

    return (
        <>
            <li onClick={onClick} className="chatRoomItem">
                <h4 className="chatRoomName">{name}</h4>
                {
                    description && 
                    <>
                        <span style={{opacity: 0.7}}>{description}</span>
                    </>
                }
            </li>
        </>
    )
}

export default ChatRoomItem