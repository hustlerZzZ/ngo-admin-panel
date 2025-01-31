import { getCookie } from "typescript-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hungertohope.org/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getAllContact: builder.query({
      query: () => {
        const token = getCookie("jwt");
        if (!token) {
          throw new Error("No token found");
        }

        return {
          url: "/contact/get-all-contact-forms",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Contact"],
    }),
    getContact: builder.query({
      query: (id: string) => {
        const token = getCookie("jwt");
        if (!token) {
          throw new Error("No authentication token found.");
        }
        return {
          url: `/contact/get-contact-from/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetAllContactQuery, useGetContactQuery } = contactApi;
