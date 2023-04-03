import { apiSlice } from "../../app/api/apiSlice";

export const workoutApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWorkouts: builder.query({
            query: (credentials) => ({
                url: "http://localhost:3000/workouts",
                method: "GET",
                body: { ...credentials },
            }),
        }),
    })
})

export const { useWorkoutsQuery } = workoutApiSlice;