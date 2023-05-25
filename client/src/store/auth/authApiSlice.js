import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...credentials, user_type: "player" },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "DELETE",
      })
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/auth/update_profile",
        // headers: { "Authorization": `Token ${credentials.authToken}` },
        method: "PATCH",
        body: { ...credentials },
      })
    }),
    autoLogin: builder.mutation({
      query: (credentials) => ({
        url: "auth/autologin",
        method: "POST",
        body: { ...credentials },
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useAutoLoginMutation,
} = authApiSlice;
