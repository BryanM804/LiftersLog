import ActivityList from "./ActivityList";
import FriendsList from "./FriendsList";


function FriendActivity() {


    
    return (
        <div className="friendActivity">
            <h3>Friends</h3>
            <hr />
            <div className="friendsGrid">
                <FriendsList />
                <div className="activityContainer">
                    Today
                    <hr />
                    <ActivityList timeframe="today"/>
                    <br />
                    Recent
                    <hr />
                    <ActivityList timeframe="recent" />
                </div>
            </div>
        </div>
    )
}

export default FriendActivity;