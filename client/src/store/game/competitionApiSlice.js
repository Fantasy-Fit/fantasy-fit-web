import { apiSlice } from "../../app/api/apiSlice";

export const competitionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCompetition: builder.mutation({
            query: (credentials) => ({
                url: "/competitions",
                method: "POST",
                body: {
                    ...credentials,
                },
            })
        }),
        getCompetitions: builder.query({
            query: (user_id) => `/competitions?user_id=${user_id}`,
        }),
        joinCompetition: builder.mutation({
            query: (body_data) => ({
                url: "/competition/join/",
                method: "POST",
                body: { ...body_data },
            })
        }),
        searchCompetitions: builder.query({
            query: (searchQuery) => ({
                url: `/search_competitions?search=${searchQuery}`,
                method: "GET",
            }),
        }),
    })
})

export const { useCreateCompetitionMutation, useJoinCompetitionMutation, useGetCompetitionsQuery, useSearchCompetitionsQuery } = competitionApiSlice;

