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
        joinCompetition: builder.mutation({
            query: async ({ identifier, user }) => {
                // console.log("user", user)
                const response = await fetch(`http://localhost:3000/competition/join/${identifier}`, {
                    method: "GET",
                })
                const competition = await response.json();
                console.log(competition, "ll")
                if (!competition) {
                    throw new Error('Competition not found');
                }

                const postComp = await fetch(`http://localhost:3000/competition/join`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        identifier: identifier,
                        competition_id: competition.id,
                        username: user,
                        user_total_points: 0
                    }
                })

                const responseComp = await postComp.json()
                console.log(responseComp)

                // return {
                    // url: `http://localhost:3000/competition/${competition.id}/join`,
                //     method: "POST",
                //     body: { competition_id: competition.id,
                //     username: user,
                //     user_total_points: 0
                //     },
                // };
            },
        }),
    })
})

export const { useCreateCompetitionMutation, useJoinCompetitionMutation } = competitionApiSlice;