import { useQuery } from "@tanstack/react-query";
import getFriendProfile from "../api/getFriendProfile";

type FriendProps = {
    username: string;
}

function Friend({ username }: FriendProps) {

    const { data, error, isLoading } = useQuery({
        queryKey: ["friend"],
        queryFn: () => getFriendProfile(username)
    });

    if (isLoading) {
        return <>Loading...</>
    }

    if (error) {
        return <>Server error occured: {error}</>
    }

    return (
        // Placeholder stuff to change later
        <>
            <h3>{data.username}</h3>
            <hr />
            Level: {data.level}
        </>
    )
}

export default Friend;