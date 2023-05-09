import SearchIcon from "@mui/icons-material/Search";
import InputOption from '../account/InputOption';
import FriendCard from './FriendCard';
import PendingFriendCard from './PendingFriendCard';
import SearchFriendResult from "./SearchFriendResult";
import {
    useGetFriendsQuery,
    useSearchFriendsMutation,
    useAcceptFriendRequestMutation,
    useDeleteFriendRequestMutation,
    useSendFriendRequestMutation,
} from '../../store/social/friendApiSlice';
import { setFriends, selectFriendships } from "../../store/social/friendSlice";
import { useDispatch, useSelector } from 'react-redux';
import "./FriendsPage.css"
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FriendsPage = () => {
    const { data: friends, isLoading, refetch: refetchFriends } = useGetFriendsQuery();
    const dispatch = useDispatch();
    const allFriends = useSelector(selectFriendships);
    const [searchFriends] = useSearchFriendsMutation();
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultMessage, setSearchResultMessage] = useState("");
    const schema = yup.object().shape({
        searchQuery: yup.string().min(1).required("Need at least 1 character to search")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmitSearch = async (data) => {
        setSearchResultMessage("")
        try {
            let searchReq = await searchFriends(getValues("searchQuery")).unwrap();
            setSearchResults(searchReq);
            if (searchReq.length === 0) {
                setSearchResultMessage("No Users Found...");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isLoading) {
            return;
        }
        dispatch(setFriends([...friends]));
    }, [friends, refetchFriends])

    const mapFriends = allFriends?.filter(friend => friend.status === "accepted").map(friend => {
        return (
            <FriendCard key={friend.friend_username} friend={friend} refetchFriends={refetchFriends} />
        );
    });

    const mapFriendRequests = friends?.filter(friend => friend.status === "requested").map(friendship => {
        return (
            <PendingFriendCard key={friendship.friend_username} friendship={friendship} refetchFriends={refetchFriends} />
        );
    });

    const mapSearchResults = searchResults?.map(result => {
        return (
            <SearchFriendResult key={result.username} friends={friends} result={result} refetchFriends={refetchFriends} />
        );
    });

    return (
        <div className="friends_page__container">
            <div className="friends_page__search">
                <h2>Search</h2>
                <form className="friends_page__searchform" onSubmit={handleSubmit(onSubmitSearch)}>
                    <input
                        type="text"
                        placeholder="search user.."
                        autoComplete="off"
                        {...register("searchQuery")}
                    />
                    <button>
                        <InputOption
                            Icon={SearchIcon}
                            title="Find"
                            type="submit"
                            color="rgb(233, 33, 112)"
                        />
                    </button>
                </form>
            </div>
            <div className="friends_page__searchresults">
                {searchResultMessage && <p style={{ color: "red" }}>{searchResultMessage}</p>}
                {getValues("searchQuery") && mapSearchResults}
            </div>
            <div >
                <h2>Pending Friend Requests</h2>
                <div className="friends_page__pending">
                    {mapFriendRequests}
                </div>
            </div>
            <div >
                <h2>Friends</h2>
                <div className="friends_page__friendscontainer">
                    {mapFriends}
                </div>
            </div>
        </div>
    );
};

export default FriendsPage;