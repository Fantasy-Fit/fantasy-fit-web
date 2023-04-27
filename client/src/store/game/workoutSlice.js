import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
    name: "workouts",
    initialState: [],
    reducers: {
        setWorkouts: (state, action) => {
            console.log(action.payload)
            const { workouts } = action.payload;
            state.workouts = workouts
        },
        addWorkout: (state, action) => {
            state.workouts.push(action.payload)
        },
    }
});

export const { setWorkouts, addWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;

export const setUserWorkouts = (state) => state.workouts

