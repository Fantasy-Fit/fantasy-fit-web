import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: document.cookie.slice(6) || null,
    workouts: JSON.parse(localStorage.getItem('workouts')),
    competitions: JSON.parse(localStorage.getItem('competitions')),
  },
  reducers: {
    setUserInfo: (state, action) => {
      Object.keys(action.payload).forEach(key => {
        state[key] = action.payload[key];
      });
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUserInfo, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectUserWorkouts = (state) => state.auth.workouts;
export const selectUserCompetitions = (state) => state.auth.competitions;
