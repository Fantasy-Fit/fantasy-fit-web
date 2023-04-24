import { apiSlice } from "../../app/api/apiSlice";

export const feedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (competition_id) => ({
        url: `/posts?competition_id=${competition_id}`,
        method: "GET",
      }),
    }),
    addPost: builder.mutation({
      query: (credentials) => ({
        url: "/posts",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } =
  feedApiSlice;
