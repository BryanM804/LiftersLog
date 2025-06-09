import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import sendFriendRequest from "../api/sendFriendRequest"
import TextInputPopup from "../../../components/TextInputPopup"
import FadePopup from "../../../components/FadePopup"

const ERROR_DURATION = 1.5

function AddFriend() {

    const [addingFriend, setAddingFriend] = useState(false)

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

    function handleConfirmation(username: string) {
        if (username.length > 0)
            addFriendMutation.mutate({ username: username })
    }

    if (addingFriend) {
        return (
            <>
                {
                    error && <FadePopup text={error} duration={ERROR_DURATION}/>
                }
                <TextInputPopup message="Add Friend" inputPlaceholder="Username" confirmFn={handleConfirmation} cancelFn={() => setAddingFriend(false)} />
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