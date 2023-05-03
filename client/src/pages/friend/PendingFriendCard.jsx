
const PendingFriendCard = ({ friend }) => {
    return (
        <div>
            <h2>{friend.friend_username}</h2>
            <img src={friend.friend_avatar} alt="friendicon" />
            <p>Request received: {friend.created_at}</p>
            <p>Status: {friend.status}</p>
            <button>Accept</button>
            <button>Ignore</button>

        </div>
    );
};

export default PendingFriendCard;