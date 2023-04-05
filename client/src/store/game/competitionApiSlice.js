import { apiSlice } from "../../app/api/apiSlice";

export const competitionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCompetition: builder.mutation({
            query: (credentials) => ({
                url: "http://localhost:3000/competitions",
                method: "POST",
                body: { ...credentials },
            })
        })
    })
})

export const { useCreateCompetitionMutation } = competitionApiSlice;