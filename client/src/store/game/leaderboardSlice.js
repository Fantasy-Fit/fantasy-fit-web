import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState: [],
    reducers: {
        setLeaderboard: (state, action) => {
            console.log("In leaderboardslice:", action.payload);
            state = action.payload;
        }
    }
});

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;

export const selectLeaderboard = (state) => state.leaderboard;