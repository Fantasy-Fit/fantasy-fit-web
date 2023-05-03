import FriendCard from './FriendCard';
import { useGetFriendsQuery } from '../../store/social/friendApiSlice';
import "./FriendsPage.css"

const FriendsPage = () => {
    const { data: friends } = useGetFriendsQuery();

    const mapFriends = friends?.filter(friend => friend.status === "accepted").map(friend => {
        return (
            <FriendCard key={friend.friend_username} friend={friend} />
        )
    });

    const mapFriendRequests = friends?.filter(friend => friend.status === "pending").map(friend => {
        return (
            <FriendCard key={friend.friend_username} friend={friend} />
        )
    });

    return (
        <div className="friends_page__container">
            <h1>Pending Friend Requests</h1>
            {mapFriendRequests}
            <h1>Associated Atheletes</h1>
            {mapFriends}
        </div>
    );
};

export default FriendsPage;