import AddFriend from "./AddFriend";
import FriendsList from "./FriendsList";
import RequestList from "./RequestList";


function FriendActivity() {


    
    return (
        <div className="friendActivity">
            <h3>Friends</h3>
            <hr />
            <AddFriend />
            <div className="friendListsList">
                <RequestList />
                <FriendsList />
            </div>
        </div>
    )
}

export default FriendActivity;