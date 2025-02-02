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
        return {
          url: "/contact/get-all-contact-forms",
          method: "GET",
        };
      },
      providesTags: ["Contact"],
    }),
    getContact: builder.query({
      query: (id: string) => {
        return {
          url: `/contact/get-contact-from/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllContactQuery, useGetContactQuery } = contactApi;
