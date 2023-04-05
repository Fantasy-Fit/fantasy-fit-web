import { createSlice } from "@reduxjs/toolkit";

const participantSlice = createSlice({
    name: "participantList",
    initialState: [],
    reducers: {
        setParticipantList: (state, action) => {
            const { participantsList } = action.payload;
            state.list = participantsList;
        }
    }
});

export const { setParticipantList } = participantSlice.actions;

export default participantSlice.reducer;