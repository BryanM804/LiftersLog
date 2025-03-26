type FriendProps = {
    username: string;
    level: number;
}

function Friend({ username, level }: FriendProps) {

    return (
        // Placeholder stuff to change later
        <li className="friend">
            <h3>{username}</h3>
            <hr />
            Level: {level}
        </li>
    )
}

export default Friend;