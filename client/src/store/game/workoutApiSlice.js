import { apiSlice } from "../../app/api/apiSlice";

export const workoutApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWorkouts: builder.query({
            query: () => ({
                url: "http://localhost:3000/workouts",
                method: "GET",
            }),
        }),
        addWorkout: builder.mutation({
            query: (credentials) => ({
                url: "http://localhost:3000/workouts",
                method: "POST",
                body: { ...credentials },
            }),
        })
    })
})

export const { useGetWorkoutsQuery, useAddWorkoutMutation } = workoutApiSlice;