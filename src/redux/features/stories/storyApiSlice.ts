import { getCookie } from "typescript-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hungertohope.org/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getCookie("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Story"],
  endpoints: (builder) => ({
    getAllStories: builder.query({
      query: () => ({
        url: "/story/get-all-stories",
        method: "GET",
      }),
      providesTags: ["Story"],
    }),
    deleteStory: builder.mutation({
      query: (id: string) => ({
        url: `/story/delete-story/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Story"],
    }),
    createStory: builder.mutation({
      query: ({
        title,
        page_url,
        image,
      }: {
        title: string;
        page_url: string;
        image: File;
      }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("page_url", page_url);
        formData.append("story", image);

        return {
          url: "/story/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Story"],
    }),
  }),
});

export const {
  useGetAllStoriesQuery,
  useDeleteStoryMutation,
  useCreateStoryMutation,
} = storyApi;
