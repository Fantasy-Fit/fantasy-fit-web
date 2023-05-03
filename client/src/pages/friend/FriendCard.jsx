import {
    useDeleteFriendRequestMutation,
} from '../../store/social/friendApiSlice';

const FriendCard = ({ friend }) => {
    const [deleteFriend] = useDeleteFriendRequestMutation();

    const handleRemoveFriend = () => {
        try {
            deleteFriend(friend.id);
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div>
            <h2>{friend.friend_username}</h2>
            <img src={friend.friend_avatar} alt="friendicon" />
            <p>Friend since ... {friend.created_at}</p>
            <p>In [X] competitions with this person</p>
            <p>Status: {friend.status}</p>
            <button onClick={handleRemoveFriend}>Remove Friend</button>
        </div>
    );
};

export default FriendCard;