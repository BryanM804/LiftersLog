import ProfilePicture from "../../../components/ProfilePicture";

type FriendProps = {
    username: string;
    level: number;
    imageURL: string;
}

function Friend({ username, level, imageURL }: FriendProps) {

    return (
        // Placeholder stuff to change later
        <li className="friend">
            <ProfilePicture imageURL={imageURL} size={32} />
            <h3>{username}</h3>
            <hr />
            Level: {level}
        </li>
    )
}

export default Friend;