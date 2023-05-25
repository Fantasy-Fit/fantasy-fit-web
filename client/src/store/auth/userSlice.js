import { createSlice } from "@reduxjs/toolkit";

const getJWTCookie = (key) => {
  const cookies = document.cookie.split(" ");
  const token = cookies.find(string => string.startsWith(key));
  return token.replace(`${key}=`, "");
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: getJWTCookie("token") || null,
    refresh: getJWTCookie("refresh") || null,
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
