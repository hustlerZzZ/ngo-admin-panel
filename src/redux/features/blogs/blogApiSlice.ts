import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hungertohope.org/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
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
          formData.append(`blog`, image);
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
