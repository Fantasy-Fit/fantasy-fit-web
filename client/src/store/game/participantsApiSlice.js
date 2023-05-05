import { apiSlice } from "../../app/api/apiSlice";

export const participantsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getParticipants: builder.query({
            query: () => ({
                url: "/users",
                method: "GET"
            })
        }),
    }),
});

export const { useGetParticipantsQuery } = participantsApiSlice;