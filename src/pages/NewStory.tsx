import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaTimes } from "react-icons/fa";
import { useCreateStoryMutation } from "../redux/features/stories/storyApiSlice.ts";

export default function NewStory() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const [createStory, { isLoading }] = useCreateStoryMutation();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleRemoveImage() {
    setImage(null);
    setPreview(null);
  }

  async function handleSubmitStory() {
    if (image == null) {
      alert("Please add a image");
      return;
    }
    const storyData = await createStory({
      title,
      page_url: url,
      image,
    }).unwrap();

    if (storyData.status === "success") {
      navigate("/app/stories");
    }
  }

  return (
    <main className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">New Story</h2>
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
              disabled={isLoading}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-4 py-1.5 border-gray-300 rounded-md placeholder-gray-500 focus:outline-gray-300"
              required
            />
          </div>

          <div className="flex flex-col space-y-1 mt-2">
            <label htmlFor="url">
              Page Url<span className="ml-0.5 text-green-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your title..."
              id="url"
              value={url}
              disabled={isLoading}
              onChange={(e) => setUrl(e.target.value)}
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
                  Only one image supported
                </p>
              </div>
              <input
                type="file"
                name="story"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {preview && (
            <div className="mt-4 relative w-32 h-32">
              <img
                src={preview}
                alt="Selected Preview"
                className="w-full h-full rounded-lg object-cover border border-gray-300"
              />
              <button
                onClick={handleRemoveImage}
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/app/stories")}
          className="bg-red-500 hover:bg-red-600 transition-all ease-in duration-100 text-white px-4 py-1 rounded-full"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmitStory}
          className="bg-green-500 hover:bg-green-600 transition-all ease-in duration-100 text-white px-4 py-1 rounded-full"
        >
          Submit
        </button>
      </div>
    </main>
  );
}
