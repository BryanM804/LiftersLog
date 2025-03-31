import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import sendFriendRequest from "../api/sendFriendRequest"


function AddFriend() {

    const [addingFriend, setAddingFriend] = useState(false)

    if (addingFriend) {
        return <AddFriendMenu cancelFn={() => setAddingFriend(false)}/>
    }

    return (
        <div className="addFriendContainer">
            <button onClick={() => setAddingFriend(true)}>Add Friend</button>
        </div>
    )
}

export default AddFriend

type AddFriendMenuProps = {
    cancelFn: () => void;
}

function AddFriendMenu({ cancelFn }: AddFriendMenuProps) {

    const [newFriendName, setNewFriendName] = useState("")
    const [error, setError] = useState(false)

    const addFriendMutation = useMutation({
        mutationFn: sendFriendRequest,
        onError: () => {
            setError(true)
        }
    });

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        setNewFriendName(e.target.value)
    }

    function handleConfirmation() {
        addFriendMutation.mutate({ username: newFriendName })
    }

    return (
        <div className="addFriendMenu">
            <input type="text" value={newFriendName} className="smallTextInput" onChange={handleTextChange}/>
            <br />
            <button onClick={handleConfirmation} className="floatingButton">Confirm</button>
            <button onClick={cancelFn} className="floatingButton">Cancel</button>
            <div className={ error ? "warningText" : "hidden"}>Invalid Username</div>
        </div>
    )
}