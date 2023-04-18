import { apiSlice } from "../../app/api/apiSlice";

export const competitionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCompetition: builder.mutation({
      query: (credentials) => ({
        url: "http://localhost:3000/competitions",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getCompetitions: builder.query({
      query: (user_id) => `/competitions?user_id=${user_id}`,
    }),
  }),
});

export const { useCreateCompetitionMutation, useGetCompetitionsQuery } =
  competitionApiSlice;
