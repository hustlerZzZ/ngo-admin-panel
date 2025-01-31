import { getCookie } from "typescript-cookie";
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
        const token = getCookie("jwt");
        if (!token) {
          throw new Error("No token found");
        }
        return {
          url: "/volunteer/get-all-volunteer-forms",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Volunteers"],
    }),
    getVolunteer: builder.query({
      query: (id: string) => {
        const token = getCookie("jwt");
        if (!token) {
          throw new Error("No authentication token found.");
        }
        return {
          url: `/volunteer/get-volunteer-form/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetAllVolunteersQuery, useGetVolunteerQuery } = volunteerApi;
