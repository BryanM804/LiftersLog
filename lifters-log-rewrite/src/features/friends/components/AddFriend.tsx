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
            <button className="addFriendButton" onClick={() => setAddingFriend(true)}>+</button>
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
        },
        onSuccess: () => {
            cancelFn()
        }
    });

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        setNewFriendName(e.target.value)
    }

    function handleConfirmation() {
        if (newFriendName.length > 0)
            addFriendMutation.mutate({ username: newFriendName })
    }

    return (
        <div className="addFriendMenu center">
            <input type="text" value={newFriendName} className="smallTextInput" onChange={handleTextChange}
                placeholder="Username"
            />
            <div style={{display: "flex", gap: "0.3rem", marginTop: "0.5rem"}} className="center">
                <button onClick={handleConfirmation} className="floatingButton menuButton">Confirm</button>
                <button onClick={cancelFn} className="floatingButton menuButton">Cancel</button>
            </div>
            <div className={ error ? "warningText" : "hidden"}>Invalid Username</div>
        </div>
    )
}