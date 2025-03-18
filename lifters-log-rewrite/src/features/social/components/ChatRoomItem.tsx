
type ChatRoomItemProps = {
    name: string;
    description?: string;
    onClick: VoidFunction;
}

function ChatRoomItem({ name, description, onClick }: ChatRoomItemProps) {

    return (
        <>
            <li onClick={onClick} className="chatRoomItem">
                <h4>{name}</h4>
                {
                    description && 
                    <>
                        {description}
                    </>
                }
            </li>
        </>
    )
}

export default ChatRoomItem