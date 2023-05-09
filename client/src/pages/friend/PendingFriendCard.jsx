import { ref } from 'yup';
import {
    useAcceptFriendRequestMutation,
    useDeleteFriendRequestMutation,
} from '../../store/social/friendApiSlice';

const PendingFriendCard = ({ friendship, refetchFriends }) => {
    console.log(friendship)
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
            <img src={friendship.friend_avatar} alt="friendicon" />
            <p>Request received: {friendship.created_at}</p>
            <p>Status: {friendship.status}</p>
            <button onClick={handleAcceptRequest}>Accept</button>
            <button onClick={handleIgnoreFriendRequest}>Ignore</button>

        </div>
    );
};

export default PendingFriendCard;