import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
  name: "workouts",
  initialState: { workouts: [] },
  reducers: {
    setWorkouts: (state, action) => {
      state.workouts = action.payload;
    },
    addWorkout: (state, action) => {
      state.workouts.push(action.payload);
    },
    updateAfteDelete: (state, action) => {
      state.workouts = state.workouts.filter(
        (workout) => workout.id !== action.payload
      );
    },
  },
});

export const { setWorkouts, addWorkout, updateAfteDelete } =
  workoutSlice.actions;

export default workoutSlice.reducer;

export const selectCurrentWorkouts = (state) => state.workouts.workouts;
