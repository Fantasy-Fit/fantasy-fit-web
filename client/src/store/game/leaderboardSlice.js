import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState: [],
    reducers: {
        setLeaderboard: (state, action) => {
            const { leaderboard } = action.payload;
            state.leaderboard = leaderboard;
        }
    }
});

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;

export const selectLeaderboard = (state) => state.leaderboard;