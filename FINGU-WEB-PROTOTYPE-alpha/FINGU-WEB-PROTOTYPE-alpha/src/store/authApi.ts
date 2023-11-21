import { chatbotServer } from "@/libs/openapi";
import { supabase } from "../libs/supabase";
import { emptySplitApi } from "./emptySplitApi";
import { Session } from "@supabase/supabase-js";

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    signOut: builder.mutation<any, any>({
      queryFn: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) {
            throw new Error("Failed to sign out");
          }
          return { data: null };
        } catch (error) {
          return {
            error,
          };
        }
      },
    }),
    readSession: builder.query<Session, any>({
      queryFn: async ()=> {
        try {
          const { error, data } = await supabase.auth.getSession();
          if (error || !data?.session) {
            throw new Error("Session not found");
          }
          return {
            data: data?.session,
          };
        } catch (error) {
          return {
            error,
          };
        }
      },
    }),
    readUser: builder.query<any, any>({
      queryFn: async () => {
        try {
          const { error, data } = await supabase.auth.getSession();

          if (error || data.session === null) {
            throw new Error("User not found");
          }

          const userId = data?.session?.user?.id;

          const userFromDB = await chatbotServer.GET("/api/users/{user_id}", {
            params: {
              path: {
                user_id: userId,
              },
            },
          });
          if (userFromDB.error) {
            throw new Error("User not found");
          }
          const user = userFromDB.data?.data;
          return {
            data: user,
          };
        } catch (error) {
          return {
            error,
          };
        }
      },
    }),
  }),
});
// Flow of the messages would be, read messages from the server, paginated, newest 10 messages, will refetch when user scroll back
// Subscribe to messages change to the server through websocket

// Send a message to the server

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignOutMutation, useReadSessionQuery, useReadUserQuery } =
  authApi;
