import { apiSlice } from "../../app/api/apiSlice";

export const likeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createLike: builder.mutation({
            query: (data) => ({
                url: "/likes",
                method: "POST",
                body: {
                    ...data,
                },
            })
        }),
        deleteLike: builder.mutation({
            query: (post_id) => ({
                url: `/like?post_id=${post_id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useCreateLikeMutation, useDeleteLikeMutation } = likeApiSlice;