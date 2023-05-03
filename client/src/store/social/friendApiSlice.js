import { apiSlice } from "../../app/api/apiSlice";

export const friendApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFriends: builder.query({
            query: () => "/friends",
        }),
        searchFriends: builder.query({
            query: (search) => `/friends?search=${search}`
        }),
    }),
});

export const { useGetFriendsQuery, useSearchFriendsQuery } = friendApiSlice;