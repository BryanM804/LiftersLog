import { useState } from "react"


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
    return (
        <div className="addFriendMenu">
            <input type="text" className=""
        </div>
    )
}