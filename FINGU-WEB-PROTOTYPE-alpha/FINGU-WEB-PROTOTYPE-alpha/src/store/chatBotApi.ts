import { emptySplitApi } from "./emptySplitApi";
import { supabase } from "@/libs/supabase";
import { chatbotServer } from "@/libs/openapi";

const chatBotApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    readMessages: builder.query<
      any,
      { page: number; pageSize: number; order: "asc" | "desc" }
    >({
      queryFn: async ({ page, pageSize, order }) => {
        try {
          const { error, data } = await supabase.auth.getSession();

          if (error) {
            return {
              error: error,
            };
          }

          const token = data?.session?.access_token ?? "";
          const userId = data?.session?.user?.id ?? "";
          const res = await chatbotServer.GET("/api/users/{user_id}/messages", {
            params: {
              header: {
                authorization: `Bearer ${token}`,
              },
              query: {
                order: order,
                page: page.toString(),
                page_size: pageSize.toString(),
              },
              path: {
                user_id: userId.toString(),
              },
            },
          });
          if (res.error || res.data.error) {
            throw new Error("Failed to read messages");
          }

          const messages = res?.data?.data?.data ?? [];
          const newMessages = [];
          // loop over messages and construct a new array
          for (let i = messages.length - 1; i >= 0; i--) {
            const message = messages[i];
            if (!message){
              continue
            }

            newMessages.push({
              id: message?.id,
              content: message?.content?.[0]?.text?.value,
              contentType: message?.content?.[0]?.type,
              role: message?.role,
            });
          }

          return { data: newMessages };
        } catch (error) {
          return { error };
        }
      },
    }),
    createMessage: builder.mutation<any, { message: string }>({
      queryFn: async ({ message }) => {
        try {
          const { error, data } = await supabase.auth.getSession();

          const token = data?.session?.access_token;
          const userId = data?.session?.user?.id;

          if (!token || !userId || error) {
            throw new Error("Missing token or userID");
          }

          const createMessageResponse = await chatbotServer.POST(
            "/api/users/{user_id}/messages",
            {
              params: {
                header: {
                  authorization: `Bearer ${token}`,
                },
                path: {
                  user_id: userId,
                },
              },
              body: {
                content: message,
                contentType: "text",
                isLiked: false,
                isDisliked: false,
                status: "sent",
                isResponse: false,
              },
            },
          );

          if (createMessageResponse.error) {
              throw new Error("Failed to create message");
          }

          return {
            data: createMessageResponse?.data?.data
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useReadMessagesQuery, useCreateMessageMutation } = chatBotApi;
