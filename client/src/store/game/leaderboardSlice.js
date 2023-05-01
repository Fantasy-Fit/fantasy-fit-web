import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState: { leaderboard: [] },
    reducers: {
        setLeaderboard: (state, action) => {
            state.leaderboard = action.payload;
        }
    }
});

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;

export const selectLeaderboard = (state) => state.leaderboard.leaderboard;