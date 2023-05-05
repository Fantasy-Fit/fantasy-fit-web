import { apiSlice } from "../../app/api/apiSlice";

export const leaderboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLeaderboard: builder.query({
            query: (competitionID) => ({
                url: `/competition/leaderboard/${competitionID}`,
                method: "GET"
            })
        })
    }),
})

export const { useGetLeaderboardQuery } = leaderboardApiSlice;