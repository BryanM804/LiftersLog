import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import sendFriendRequest from "../api/sendFriendRequest"
import FadePopup from "../../../components/FadePopup"
import PopupMenu from "../../../components/PopupMenu"

const ERROR_DURATION = 1.5

function AddFriend() {

    const [addingFriend, setAddingFriend] = useState(false)
    const [friendUsername, setFriendUsername] = useState("");

    const [error, setError] = useState<string | null>(null)

    const addFriendMutation = useMutation({
        mutationFn: sendFriendRequest,
        onError: (error: Error) => {
            setError(error.message)
            setTimeout(() => {
                setError(null)
            }, ERROR_DURATION * 1000)
        },
        onSuccess: () => {
            setAddingFriend(false)
        }
    });

    function handleConfirmation() {
        if (friendUsername.length > 0)
            addFriendMutation.mutate({ username: friendUsername })
    }

    if (addingFriend) {
        return (
            <>
                {
                    error && <FadePopup text={error} duration={ERROR_DURATION}/>
                }
                <PopupMenu
                    title="Add Friend"
                    onSubmit={handleConfirmation}
                    onCancel={() => setAddingFriend(false)}
                    confirmButtonText="Send"
                >
                    <input type="text" value={friendUsername} className="smallTextInput" onChange={(e: ChangeEvent<HTMLInputElement>) => setFriendUsername(e.target.value)} placeholder="Username" />
                </PopupMenu>
            </>
        )
    }

    return (
        <div className="addFriendContainer">
            <button className="addFriendButton" onClick={() => setAddingFriend(true)}>+</button>
        </div>
    )
}

export default AddFriend