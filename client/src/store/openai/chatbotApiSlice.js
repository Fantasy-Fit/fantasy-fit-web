import { apiSlice } from "../../app/api/apiSlice";

export const chatbotApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postChatBotComment: builder.mutation({
            query: (workoutHistory) => ({
                url: "http://localhost:8000/fitbot/botcomment/",
                method: "POST",
                body: { "prompts": workoutHistory }
            }),
        }),
    }),
});

export const { usePostChatBotCommentMutation } = chatbotApiSlice;