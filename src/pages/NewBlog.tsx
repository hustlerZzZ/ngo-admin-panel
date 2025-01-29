import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import { useCreateBlogMutation } from "../redux/features/blogs/blogApiSlice.ts";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      setImages([...images, ...Array.from(files)]);
    }
  }

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index));
  }

  async function handleCreateBlog() {
    const blogData = await createBlog({ title, content, images }).unwrap();

    if (blogData.status === "success") {
      navigate("/blogs");
    }
  }

  return (
    <main className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">New Blog</h2>
        <form className="mt-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="title">
              Title<span className="ml-0.5 text-green-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your title..."
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              className="border px-4 py-1.5 border-gray-300 rounded-md placeholder-gray-500 focus:outline-gray-300"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mt-2">
            <label htmlFor="content">
              Content<span className="ml-0.5 text-green-600">*</span>
            </label>
            <textarea
              placeholder="Enter amazing content..."
              id="content"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
              className="border px-4 py-1.5 border-gray-300 rounded-md placeholder-gray-500 focus:outline-gray-300"
              required
            />
          </div>

          <div className="mt-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition-all">
              <div className="flex flex-col items-center justify-center text-gray-500">
                <FaUpload className="text-2xl mb-2" />
                <p className="text-sm">Click to upload or drag & drop</p>
                <p className="text-xs text-gray-400">
                  Multiple images supported
                </p>
              </div>
              <input
                type="file"
                name="blog"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </label>

            {images.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Preview:</h3>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-red-500 hover:bg-red-600 transition-all ease-in duration-100 text-white px-4 py-1 rounded-full"
          onClick={() => navigate("/app/blogs")}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleCreateBlog}
          className="bg-green-500 hover:bg-green-600 transition-all ease-in duration-100 text-white px-4 py-1 rounded-full"
        >
          Submit
        </button>
      </div>
    </main>
  );
}
