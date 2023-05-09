import {
    useSendFriendRequestMutation,
} from '../../store/social/friendApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/auth/userSlice';

const SearchFriendResult = ({ result, friends, refetchFriends }) => {
    const [sendFriendRequest] = useSendFriendRequestMutation();
    const currentUser = useSelector(selectCurrentUser);
    const friendStatus = friends.find(friend => friend.friend_id === result.id)?.status;

    const renderFriendStatusButton = (status) => {
        switch (status) {
            case "accepted":
                return (<p>Already a friend</p>);
            case "pending":
                return (<p>Friend request pending</p>);
            default:
                return (<button onClick={handleSendFriendRequest}>Send Friend Request</button>);
        };
    };

    if (!result) {
        return;
    };

    if (result.id === currentUser.id) {
        return;
    };

    const handleSendFriendRequest = async () => {
        try {
            await sendFriendRequest(result.id);
            refetchFriends();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="friend_card__container">
            <h2>{result.username}</h2>
            <img src={result.avatar} alt="friendicon" />
            {renderFriendStatusButton(friendStatus)}
        </div>
    );
};

export default SearchFriendResult;