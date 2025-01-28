import * as React from "react";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { setUser } from "../redux/features/user/userSlice.ts";
import { useSignInMutation } from "../redux/features/user/userApiSlice.ts";
import { loggedIn } from "../redux/features/auth/authSlice.ts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const userData = await signIn({ email, password }).unwrap();

      if (userData.status === "success") {
        toast("✅ Login Success!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        dispatch(setUser(userData.user));
        dispatch(loggedIn());

        setTimeout(() => {
          navigate("/app");
        }, 1200);
      }
    } catch (e) {
      console.log(e);
      toast.error("Error in logging in.!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <>
      <ToastContainer />
      <main className="grid h-screen grid-cols-[1fr_auto]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-start my-4">
            <img src="/HungerToHope.png" alt="logo" className="w-20 h-20" />
          </div>
          <div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Welcome Back Chief</h2>
              <p className="mt-2">
                Make sure to use <b>Desktop/Laptop</b> for best experience.
              </p>
            </div>
            <form
              className="flex flex-col space-y-4 mt-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col space-y-1">
                <label htmlFor="email">
                  Email<span className="ml-0.5 text-green-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your mail address"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="border px-4 py-1.5 border-gray-300 rounded-md placeholder-gray-500 focus:outline-gray-300"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="password">
                  Password<span className="ml-0.5 text-green-600">*</span>
                </label>
                <div className="relative flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    id="password"
                    value={password}
                    disabled={isLoading}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border px-4 py-1.5 border-gray-300 rounded-md placeholder-gray-500 w-full focus:outline-gray-300"
                    required
                  />
                  {showPassword ? (
                    <FaRegEye
                      className="absolute top-2.5 right-3 cursor-pointer"
                      onClick={() => setShowPassword((curr) => !curr)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className="absolute top-2.5 right-3 cursor-pointer"
                      onClick={() => setShowPassword((curr) => !curr)}
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 py-2.5 rounded text-white cursor-pointer"
                disabled={isLoading}
              >
                Log in
              </button>
            </form>
          </div>
        </div>
        <div>
          <img src="/bg.jpg" alt="bg-img" className="h-screen" />
        </div>
      </main>
    </>
  );
}
