import { apiSlice } from "../../app/api/apiSlice";

export const workoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkouts: builder.query({
      query: (user_id) => ({
        url: `/workouts?user_id=${user_id}`,
      }),
    }),
    addWorkout: builder.mutation({
      query: (credentials) => ({
        url: "/workouts",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    deleteWorkout: builder.mutation({
      query: (id) => ({
        url: `/workouts/${id}`,
        method: "DELETE",
      }),
    })
  }),
});

export const {
  useGetWorkoutsQuery,
  useAddWorkoutMutation,
  useDeleteWorkoutMutation,
  useGetCompWorkoutsQuery,
} = workoutApiSlice;
