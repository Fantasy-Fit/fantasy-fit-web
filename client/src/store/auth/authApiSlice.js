import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "http://localhost:3000/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "http://localhost:3000/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "http://localhost:3000/logout",
        method: "DELETE",
      })
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "http://localhost:3000/auth/update_profile",
        // headers: { "Authorization": `Token ${credentials.authToken}` },
        method: "PATCH",
        body: { ...credentials },
      })
    })
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation, useUpdateProfileMutation } = authApiSlice;
