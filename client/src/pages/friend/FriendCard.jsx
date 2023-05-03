const FriendCard = ({ friend }) => {
    return (
        <div>
            <h2>{friend.friend_username}</h2>
            <img src={friend.friend_avatar} alt="friendicon" />
            <p>Friend since ... {friend.created_at}</p>
            <p>In [X] competitions with this person</p>
            <button>Status: {friend.status}</button>

        </div>
    );
};

export default FriendCard;