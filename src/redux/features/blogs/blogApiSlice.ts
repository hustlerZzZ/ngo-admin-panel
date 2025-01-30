import { getCookie } from "typescript-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getCookie("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: ({
        title,
        content,
        images,
      }: {
        title: string;
        content: string;
        images: File[];
      }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        images.forEach((image) => {
          formData.append(`blog`, image); // Backend should expect `images` as an array
        });

        return {
          url: "/blogs/create",
          method: "POST",
          body: formData,
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
      query: (id: string) => ({
        url: `/blogs/delete-blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useDeleteBlogMutation,
  useCreateBlogMutation,
} = blogApi;
