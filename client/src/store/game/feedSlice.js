import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { posts: [] },
  reducers: {
    setPosts: (state, action) => {
      //   const { posts } = action.payload;
      state.posts.push(action.payload);
    },
  },
});

export const { setPosts } = feedSlice.actions;

export default feedSlice.reducer;

export const selectFeedState = (state) => state.feed.posts;
