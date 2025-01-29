import { getCookie } from "typescript-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (credentials: {
        title: string;
        content: string;
        images: File[];
      }) => {
        const token = getCookie("jwt");
        if (!token) {
          throw new Error("No authentication token found.");
        }
        return {
          url: "/blogs/create",
          method: "POST",
          body: credentials,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Blogs"],
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blogs/get-all-blogs",
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => {
        const token = getCookie("jwt");
        if (!token) {
          throw new Error("No authentication token found.");
        }
        return {
          url: `/blogs/delete-blog/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useDeleteBlogMutation,
  useCreateBlogMutation,
} = blogApi;
