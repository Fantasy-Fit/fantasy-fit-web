import { apiSlice } from "../../app/api/apiSlice";

export const friendApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFriends: builder.query({
            query: () => "/friends",
        }),
    }),
});

export const { useGetFriendsQuery } = friendApiSlice;