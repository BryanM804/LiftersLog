
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
                        <div className="chatRoomItemDescription">
                            {description}
                        </div>
                    </>
                }
            </li>
        </>
    )
}

export default ChatRoomItem