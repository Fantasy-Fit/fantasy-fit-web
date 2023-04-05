import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState: { rankings: [] },
    reducers: {
        setLeaderboard: (state, action) => {
            console.log("In leaderboardslice:", action)
            // state.rankings = [...action.payload]
            state.rankings = action.payload
            // state.rankings = action.payload


            // return { ...state, }
            // const [...leaderboard] = action.payload;
            // state.leaderboard = leaderboard;
        }
    }
});

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;

export const selectLeaderboard = (state) => state.leaderboard.rankings;