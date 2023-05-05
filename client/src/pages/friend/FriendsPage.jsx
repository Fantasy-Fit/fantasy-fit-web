import SearchIcon from "@mui/icons-material/Search";
import InputOption from '../account/InputOption';
import FriendCard from './FriendCard';
import PendingFriendCard from './PendingFriendCard';
import SearchFriendResult from "./SearchFriendResult";
import {
    useGetFriendsQuery,
    useSearchFriendsQuery,
    useAcceptFriendRequestMutation,
    useDeleteFriendRequestMutation,
    useSendFriendRequestMutation,
} from '../../store/social/friendApiSlice';
import { setFriends } from "../../store/social/friendSlice";
import { useDispatch } from 'react-redux';
import "./FriendsPage.css"
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FriendsPage = () => {
    const { data: friends, isLoading } = useGetFriendsQuery();
    const dispatch = useDispatch();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [deleteFriend] = useDeleteFriendRequestMutation();
    const [sendFriendRequest] = useSendFriendRequestMutation();
    const [searchResultMessage, setSearchResultMessage] = useState("");
    const schema = yup.object().shape({
        searchQuery: yup.string().min(1).required("Need at least 1 character to search")
    });

    console.log(friends)

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const {
        data: searchResults,
        isLoading: isSearchLoading,
        refetch: submitSearchRequest
    } = useSearchFriendsQuery(
        getValues("searchQuery") ?? "",
        { skip: !getValues("searchQuery") }
    );

    const onSubmitSearch = async (data) => {
        setSearchResultMessage("")
        try {
            let searchReq = await submitSearchRequest().unwrap();
            console.log(searchReq);
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
        dispatch(setFriends([...friends]))
    }, [friends])

    const mapFriends = friends?.filter(friend => friend.status === "accepted").map(friend => {
        return (
            <FriendCard key={friend.friend_username} friend={friend} />
        )
    });

    const mapFriendRequests = friends?.filter(friend => friend.status === "requested").map(friendship => {
        return (
            <PendingFriendCard key={friendship.friend_username} friendship={friendship} />
        )
    });

    const mapSearchResults = searchResults?.map(result => {
        return (
            <SearchFriendResult key={result.username} result={result} />
        )
    })

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
            {searchResultMessage && <p style={{ color: "red" }}>{searchResultMessage}</p>}
            {getValues("searchQuery") && !isSearchLoading && mapSearchResults}
            <div className="friends_page__pending">
                <h2>Pending Friend Requests</h2>
                {mapFriendRequests}
            </div>
            <div className="friends_page__friendscontainer">
                <h2>Friends</h2>
                {mapFriends}
            </div>
        </div>
    );
};

export default FriendsPage;