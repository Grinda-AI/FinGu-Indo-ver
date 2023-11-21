import { chatbotServer } from "@/libs/openapi";
import { emptySplitApi } from "./emptySplitApi";
import { paths as chatbotServerPath } from "../types/chatServer";

export type ReadInstitutionsResponse =
  chatbotServerPath["/api/users/{user_id}/connected_institutions"]["get"]["responses"]["200"]["content"]["application/json"];

export type ReadInstitutionResponse =
  chatbotServerPath["/api/institutions/{institution_id}"]["get"]["responses"]["200"]["content"]["application/json"];

const connectionApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    readInstitutions: builder.query<
      ReadInstitutionsResponse,
      { userId: string }
    >({
      queryFn: async ({ userId }) => {
        try {
          const institutionList = await chatbotServer.GET(
            "/api/users/{user_id}/connected_institutions",
            {
              params: {
                path: {
                  user_id: userId,
                },
              },
            },
          );
          if (institutionList.error) {
            throw new Error("Failed to read institutions");
          }
          return {
            data: institutionList.data,
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["institutions"],
    }),
    readInstitution: builder.query<
      ReadInstitutionResponse,
      { institutionId: string }
    >({
      queryFn: async ({ institutionId }) => {
        try {
          const readInstitutionResponse = await chatbotServer.GET(
            "/api/institutions/{institution_id}",
            {
              params: {
                path: {
                  institution_id: institutionId,
                },
              },
            },
          );

          if (readInstitutionResponse.error) {
            throw new Error("Failed to read institution");
          }
          return { data: readInstitutionResponse.data };
        } catch (error) {
          return { error };
        }
      },
    }),
    connectInstitution: builder.mutation<
      any,
      {
        userId: string;
        username: string;
        password: string;
        institutionId: string;
      }
    >({
      queryFn: async ({ userId, username, password, institutionId }) => {
        try {
          const connectInstitutionResponse = await chatbotServer.PUT(
            "/api/users/{user_id}/connected_institutions",
            {
              params: {
                path: {
                  user_id: userId,
                },
              },
              body: {
                institution_id: institutionId,
                user_institution_password: password,
                user_institution_username: username,
              },
            },
          );
          if (connectInstitutionResponse.error) {
            throw new Error("Failed to connect institution");
          }

          return {
            data: connectInstitutionResponse.data,
          };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["institutions"],
    }),
    disconnectInstitution: builder.mutation<
      any,
      { userId: string; institutionId: string }
    >({
      queryFn: async ({ userId, institutionId }) => {
        try {
          const disconnectInstitutionResponse = await chatbotServer.DELETE(
            "/api/users/{user_id}/connected_institutions/{institution_id}",
            {
              params: {
                path: {
                  user_id: userId,
                  institution_id: institutionId,
                },
              },
            },
          );

          if (disconnectInstitutionResponse.error) {
            throw new Error("Failed to disconnect institution");
          }

          return { data: disconnectInstitutionResponse.data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["institutions"],
    }),
  }),
});
export const {
  useReadInstitutionsQuery,
  useConnectInstitutionMutation,
  useReadInstitutionQuery,
  useDisconnectInstitutionMutation
} = connectionApi;
