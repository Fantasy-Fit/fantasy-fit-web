import {
    useAcceptFriendRequestMutation,
    useDeleteFriendRequestMutation,
} from '../../store/social/friendApiSlice';

const PendingFriendCard = ({ friendship, refetchFriends }) => {
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [deleteFriendRequest] = useDeleteFriendRequestMutation();

    const handleAcceptRequest = async () => {
        try {
            await acceptFriendRequest(friendship.id);
            refetchFriends();
        } catch (err) {
            console.error(err);
        };
    };

    const handleIgnoreFriendRequest = async () => {
        try {
            await deleteFriendRequest(friendship.id);
            refetchFriends();
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div>
            <h2>{friendship.friend_username}</h2>
            <img src={friendship.friend_avatar || "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"} alt="friendicon" />
            <p>Request received: {friendship.created_at}</p>
            <p>Status: {friendship.status}</p>
            <button onClick={handleAcceptRequest}>Accept</button>
            <button onClick={handleIgnoreFriendRequest}>Ignore</button>

        </div>
    );
};

export default PendingFriendCard;