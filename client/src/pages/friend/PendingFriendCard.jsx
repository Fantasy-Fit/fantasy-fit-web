import {
    useAcceptFriendRequestMutation,
    useDeleteFriendRequestMutation,
} from '../../store/social/friendApiSlice';

const PendingFriendCard = ({ friend }) => {
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [deleteFriendRequest] = useDeleteFriendRequestMutation();

    const handleAcceptRequest = () => {
        try {
            acceptFriendRequest(friend.id);
        } catch (err) {
            console.error(err);
        };
    };

    const handleIgnoreFriendRequest = () => {
        try {
            deleteFriendRequest(friend.id);
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div>
            <h2>{friend.friend_username}</h2>
            <img src={friend.friend_avatar} alt="friendicon" />
            <p>Request received: {friend.created_at}</p>
            <p>Status: {friend.status}</p>
            <button onClick={handleAcceptRequest}>Accept</button>
            <button onClick={handleIgnoreFriendRequest}>Ignore</button>

        </div>
    );
};

export default PendingFriendCard;