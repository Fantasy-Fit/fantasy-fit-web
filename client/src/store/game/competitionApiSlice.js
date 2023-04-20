import { apiSlice } from "../../app/api/apiSlice";

export const competitionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCompetition: builder.mutation({
            query: (credentials) => ({
                url: "http://localhost:3000/competitions",
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
                url: "http://localhost:3000/competition/join/",
                method: "POST",
                body: { ...body_data },
            })
        }),
    })
})

export const { useCreateCompetitionMutation, useJoinCompetitionMutation, useGetCompetitionsQuery } = competitionApiSlice;

