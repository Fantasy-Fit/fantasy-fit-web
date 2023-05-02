import { createSlice } from '@reduxjs/toolkit';

const competitionSlice = createSlice({
    name: "competitions",
    initialState: { competitions: [] },
    reducers: {
        setCompetitions: (state, action) => {
            state.competitions = action.payload;
        },
        addCompetition: (state, action) => {
            state.competitions.push(action.payload);
        },
    },
});

export const { setCompetitions, addCompetition } = competitionSlice.actions;

export default competitionSlice.reducer;

export const selectCurrentCompetitions = (state) => state.competitions.competitions;