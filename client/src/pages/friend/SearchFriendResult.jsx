import {
    useSendFriendRequestMutation,
} from '../../store/social/friendApiSlice';

const SearchFriendResult = ({ result }) => {
    const isFriend = result.inverse_friends.find(user => user.username === "chrisli")
    const [sendFriendRequest] = useSendFriendRequestMutation();

    if (!result) {
        return;
    };

    console.log(result)

    const handleSendFriendRequest = () => {
        try {
            sendFriendRequest(result.id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>{result.username}</h2>
            <img src={result.avatar} alt="friendicon" />
            {!!isFriend && <p>Already a friend or there is a pending request</p>}
            {!isFriend && <button onClick={handleSendFriendRequest}>Send Friend Request</button>}
        </div>
    );
};

export default SearchFriendResult;