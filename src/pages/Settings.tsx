import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks.ts";
import {
  useUpdateMeMutation,
  useUpdatePasswordMutation,
} from "../redux/features/user/userApiSlice.ts";
import { setUser } from "../redux/features/user/userSlice.ts";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
  }, [user]);

  async function handleUpdateMe() {
    const userData = await updateMe({
      name: user.name,
      email: user.email,
    }).unwrap();

    if (userData.status === "success") {
      dispatch(setUser({ ...user, email, name }));
      navigate("/app/blogs");
    }
  }

  async function handlePasswordUpdate() {
    if (newPassword === "" || newPassword === "") {
      alert("Kindly fill both the fields!");
      return;
    }
    const userData = await updatePassword({
      old_password: oldPassword,
      new_password: newPassword,
    }).unwrap();

    if (userData.status === "success") {
      navigate("/app/blogs");
    }
  }

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold">Your Profile</h2>

      <div className="mt-4 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name">
            Name<span className="ml-0.5 text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            id="name"
            disabled={isLoading}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="border px-4 py-1.5 border-gray-300 rounded-md placeholder-gray-500 focus:outline-gray-300"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="old_password">
            Enter old Password<span className="ml-0.5 text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your old password..."
            id="old_password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isLoading}
            className="border px-4 py-1.5 w-full border-gray-300 rounded-md placeholder-gray-500 focus:outline-gray-300"
            required
          />
          <label htmlFor="password">
            Enter new Password<span className="ml-0.5 text-red-600">*</span>
          </label>
          <div className="flex space-x-4 w-full">
            <input
              type="text"
              placeholder="Enter your new password..."
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
              className="border px-4 py-1.5 w-full border-gray-300 rounded-md placeholder-gray-500 focus:outline-gray-300"
              required
            />
            <button
              onClick={handlePasswordUpdate}
              className="bg-green-500 w-48 hover:bg-green-600 transition-all ease-in duration-100 px-4 text-white rounded cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-8">
        <button className="bg-red-500 hover:bg-red-600 transition-all ease-in duration-100 text-white px-4 py-2 rounded">
          Cancel
        </button>
        <button
          onClick={handleUpdateMe}
          className="bg-green-500 hover:bg-green-600 transition-all ease-in duration-100 text-white px-4 py-2 rounded"
        >
          Update Your Profile
        </button>
      </div>
    </main>
  );
}
