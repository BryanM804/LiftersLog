import ActivityList from "./ActivityList";
import AddFriend from "./AddFriend";
import FriendsList from "./FriendsList";
import RequestList from "./RequestList";


function FriendActivity() {


    
    return (
        <div className="friendActivity">
            <h3>Friends</h3>
            <hr />
            <AddFriend />
            <div className="friendsGrid">
                <div>
                    <RequestList />
                    <FriendsList />
                </div>
                <div className="activityContainer">
                    <span style={{fontWeight: "bold"}}>
                        Today
                    </span>
                    <hr />
                    <ActivityList timeframe="today"/>
                    <br />
                    <span style={{fontWeight: "bold"}}>
                        Recent
                    </span>
                    <hr />
                    <ActivityList timeframe="recent" />
                </div>
            </div>
        </div>
    )
}

export default FriendActivity;