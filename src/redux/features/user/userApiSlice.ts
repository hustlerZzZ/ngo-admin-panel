import { getCookie } from "typescript-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hungertohope.org/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/user/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyMe: builder.mutation({
      query: () => {
        const token = getCookie("jwt");
        if (!token) {
          throw new Error("No token found");
        }
        return {
          url: "/user/verify-token",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateMe: builder.mutation({
      query: (credentials: { name: string; email: string }) => {
        const token = getCookie("jwt");
        if (!token) {
          throw new Error("No token found");
        }
        return {
          url: "/user/update-me",
          method: "PUT",
          body: credentials,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updatePassword: builder.mutation({
      query: (credentials: { old_password: string; new_password: string }) => {
        const token = getCookie("jwt");
        if (!token) {
          throw new Error("No token found");
        }
        return {
          url: "/user/update-password",
          method: "PUT",
          body: credentials,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useVerifyMeMutation,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
} = userApi;
