import { apiSlice } from "../../app/api/apiSlice";

export const leaderboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLeaderboard: builder.query({
            query: (competitionID) => ({
                url: `http://localhost:3000/competition/leaderboard/${competitionID}`,
                method: "GET"
            })
        })
    }),
})

export const { useGetLeaderboardQuery } = leaderboardApiSlice;