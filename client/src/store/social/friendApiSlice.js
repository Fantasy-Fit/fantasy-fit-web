import { apiSlice } from "../../app/api/apiSlice";

export const friendApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFriends: builder.query({
            query: () => "/friends",
        }),
        searchFriends: builder.mutation({
            query: (search) => ({
                url: "/searchfriends",
                method: "POST",
                body: { query: search }
            }),
        }),
        acceptFriendRequest: builder.mutation({
            query: (friendship_id) => ({
                url: `/accept_friend/${friendship_id}`,
                method: "PATCH",
                body: { status: "accepted" },
            }),
        }),
        deleteFriendRequest: builder.mutation({
            query: (friendship_id) => ({
                url: `/delete_friend/${friendship_id}`,
                method: "DELETE",
            }),
        }),
        sendFriendRequest: builder.mutation({
            query: (friend_id) => ({
                url: "/friends",
                method: "POST",
                body: { "friend_id": friend_id },
            }),
        }),
    }),
});

export const {
    useGetFriendsQuery,
    useSearchFriendsMutation,
    useAcceptFriendRequestMutation,
    useDeleteFriendRequestMutation,
    useSendFriendRequestMutation,
} = friendApiSlice;