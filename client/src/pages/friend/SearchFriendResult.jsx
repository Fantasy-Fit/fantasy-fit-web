const SearchFriendResult = ({ result }) => {
    if (!result) {
        return;
    };

    return (
        <div>
            <h2>{result.username}</h2>
            <img src={result.avatar} alt="friendicon" />
            <button>Send Friend Request</button>
        </div>
    );
};

export default SearchFriendResult;