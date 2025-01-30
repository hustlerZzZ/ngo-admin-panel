import {FaUpload} from "react-icons/fa";
import {useAppSelector} from "../hooks/reduxHooks.ts";

export default function Settings() {
  const user = useAppSelector(state => state.user);
  return <main className="p-4">
    <h2 className="text-2xl font-bold">Your Profile</h2>

    <div className="mt-4 flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="name">
          Name<span className="ml-0.5 text-red-600">*</span>
        </label>
        <input
            type="text"
            placeholder="Enter your name..."
            value={user.name}
            id="name"
            className="border px-4 py-1.5 border-gray-300 rounded-md placeholder-gray-500 focus:outline-gray-300"
            required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="email">
          Email<span className="ml-0.5 text-red-600">*</span>
        </label>
        <input
            type="email"
            placeholder="Enter your email..."
            id="email"
            value={user.email}
            className="border px-4 py-1.5 border-gray-300 rounded-md placeholder-gray-500 focus:outline-gray-300"
            required
        />
      </div>


      <div className="flex flex-col space-y-2">
        <label htmlFor="password">
          Enter new Password<span className="ml-0.5 text-red-600">*</span>
        </label>
        <input
            type="text"
            placeholder="Enter your new password..."
            id="password"
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
              Upload your avatar here...
            </p>
          </div>

        <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>
    </div>

    <div className="flex space-x-4 mt-8">
      <button className="bg-red-500 hover:bg-red-600 transition-all ease-in duration-100 text-white px-4 py-2 rounded-full">Cancel</button>
      <button className="bg-green-500 hover:bg-green-600 transition-all ease-in duration-100 text-white px-4 py-2 rounded-full">Update Your Profile</button>
    </div>
  </main>;
}
