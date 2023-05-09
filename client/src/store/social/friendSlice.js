import { createSlice } from '@reduxjs/toolkit';

const friendSlice = createSlice({
    name: "friendships",
    initialState: { friends: [] },
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
    },
});

export const { setFriends } = friendSlice.actions;

export default friendSlice.reducer;

export const selectFriendships = (state) => state.friends.friends;