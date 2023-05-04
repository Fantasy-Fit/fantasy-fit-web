import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../store/auth/userSlice";
import workoutReducer from "../store/game/workoutSlice";
import leaderboardReducer from "../store/game/leaderboardSlice";
import feedReducer from "../store/game/feedSlice";
import competitionReducer from "../store/game/competitionSlice";
import friendReducer from "../store/social/friendSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    workouts: workoutReducer,
    leaderboard: leaderboardReducer,
    feed: feedReducer,
    competitions: competitionReducer,
    friends: friendReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
