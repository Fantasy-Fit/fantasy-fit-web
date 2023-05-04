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
    console.log(friends)
    const dispatch = useDispatch();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [deleteFriend] = useDeleteFriendRequestMutation();
    const [sendFriendRequest] = useSendFriendRequestMutation();
    // const [searchFriendQuery, setSearchFriendQuery] = useState(null);
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
        // setSearchFriendQuery(getValues("searchQuery"))
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
            <h1>Search</h1>

            <form className="friends_page__search" onSubmit={handleSubmit(onSubmitSearch)}>
                <input
                    type="text"
                    placeholder="search user.."
                    autoComplete="false"
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
            {searchResultMessage && <p style={{ color: "red" }}>{searchResultMessage}</p>}
            {getValues("searchQuery") && !isSearchLoading && mapSearchResults}

            <h1>Pending Friend Requests</h1>
            {mapFriendRequests}
            <h1>Associated Atheletes</h1>
            {mapFriends}
        </div>
    );
};

export default FriendsPage;