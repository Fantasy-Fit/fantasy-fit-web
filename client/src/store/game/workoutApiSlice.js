import { apiSlice } from "../../app/api/apiSlice";

export const workoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkouts: builder.query({
      query: (user_id) => ({
        url: `http://localhost:3000/workouts?user_id=${user_id}`,
      }),
    }),
    addWorkout: builder.mutation({
      query: (credentials) => ({
        url: "http://localhost:3000/workouts",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    deleteWorkout: builder.mutation({
      query: (id) => ({
        url: `/workouts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useAddWorkoutMutation,
  useDeleteWorkoutMutation,
} = workoutApiSlice;
