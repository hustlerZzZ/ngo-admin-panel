import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const volunteerApi = createApi({
  reducerPath: "volunteerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hungertohope.org/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Volunteers"],
  endpoints: (builder) => ({
    getAllVolunteers: builder.query({
      query: () => {
        return {
          url: "/volunteer/get-all-volunteer-forms",
          method: "GET",
        };
      },
      providesTags: ["Volunteers"],
    }),
    getVolunteer: builder.query({
      query: (id: string) => {
        return {
          url: `/volunteer/get-volunteer-form/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllVolunteersQuery, useGetVolunteerQuery } = volunteerApi;
