import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUserInfo, logOut } from "../../store/auth/userSlice";

const env_URL = {
  "production": "https://fantasyfit.herokuapp.com/",
  "development": "http://localhost:3000",
  "test:": "http://localhost:3000"
}

const baseQuery = fetchBaseQuery({
  baseUrl: env_URL[process.env.NODE_ENV],
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const refreshQuery = fetchBaseQuery({
  baseUrl: env_URL[process.env.NODE_ENV],
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const refreshToken = getState().auth.refresh;
    if (refreshToken) {
      headers.set("Authorization", `Bearer ${refreshToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await refreshQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setUserInfo({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // need to fix the below
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
