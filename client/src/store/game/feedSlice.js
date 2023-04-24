import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { posts: [] },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    updateAfteDelete: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
  },
});

export const { setPosts, updateAfteDelete } = feedSlice.actions;

export default feedSlice.reducer;

export const selectFeedState = (state) => state.feed.posts;
