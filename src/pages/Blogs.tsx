import { FiExternalLink } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../redux/features/blogs/blogApiSlice.ts";

export default function Blogs() {
  const [deleteBlog] = useDeleteBlogMutation();
  const { data, error, isLoading } = useGetAllBlogsQuery({});

  if (error) return <p>Error!</p>;
  if (isLoading) return <p>Loading...</p>;

  async function handleDelete(id: string) {
    await deleteBlog(id).unwrap();
  }

  if (data.blogs.length === 0) {
    return (
      <div className="p-8">
        <h3 className="text-center text-4xl my-4 font-bold">
          Time to add some fresh blogs chief!
        </h3>
        <div className="flex items-center justify-center">
          <img src="/blog.svg" alt="img" className="h-96 w-96" />
        </div>
      </div>
    );
  }

  return (
    <main className="p-8">
      <table className="w-full outline">
        <thead>
          <tr className="grid grid-cols-6 justify-between bg-black text-white px-4 py-2">
            <td>S.No</td>
            <td>Title</td>
            <td>Date & Time</td>
            <td>Author</td>
            <td>Link</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {data.blogs.map(
            (
              blog: { title: string; created_at: string; id: string },
              i: number,
            ) => (
              <tr
                key={i}
                className="grid grid-cols-6 justify-between bg-gray-200  px-4 py-2"
              >
                <td>{i + 1}.</td>
                <td>{blog.title}</td>
                <td>{new Date(blog.created_at).toDateString()}</td>
                <td>Admin</td>
                <td>
                  <a
                    href={`https://hungertohope.org/blog-and-stories/blog/${blog.id}`}
                    className="hover:underline flex items-center space-x-2"
                  >
                    <span>View Blog</span> <FiExternalLink />
                  </a>
                </td>
                <td className="flex items-center space-x-2">
                  <button
                    className="bg-red-500 p-1 rounded cursor-pointer"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <FaTrashAlt className="text-white text-md" />
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </main>
  );
}
