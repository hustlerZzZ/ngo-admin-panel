import { useDispatch } from "react-redux";
import { IoMdExit } from "react-icons/io";
import { removeCookie } from "typescript-cookie";
import { IoIosSettings } from "react-icons/io";
import { LiaBlogSolid } from "react-icons/lia";
import { Link, NavLink } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import { MdOutlineContactPhone } from "react-icons/md";
import { loggedOut } from "../redux/features/auth/authSlice.ts";
import { logOutUser } from "../redux/features/user/userSlice.ts";

export default function Sidebar() {
  const dispatch = useDispatch();

  function logMeOut() {
    removeCookie("jwt");
    dispatch(logOutUser());
    dispatch(loggedOut());
  }

  return (
    <div className="flex flex-col justify-between border-r border-gray-200 h-screen pt-8 w-96">
      <div>
        <Link to="/app/blogs" className="flex items-center justify-center">
          <img src="/HungerToHope.png" alt="logo" className="w-24 h-24" />
        </Link>
        <nav className="flex flex-col mt-10">
          <NavLink
            to="/app/blogs"
            className="flex items-center space-x-2 py-4 px-5 hover:bg-green-500 hover:text-white transition-all ease-in"
          >
            <LiaBlogSolid /> <span>Blogs</span>
          </NavLink>
          <NavLink
            to="/app/stories"
            className="flex items-center space-x-2 py-4 px-5 hover:bg-green-500 hover:text-white transition-all ease-in"
          >
            <LiaBlogSolid /> <span>Stories</span>
          </NavLink>
          <NavLink
            to="/app/volunteer-forms"
            className="flex items-center space-x-2 py-3 px-5 hover:bg-green-500 hover:text-white transition-all ease-in"
          >
            <MdVolunteerActivism /> <span>Volunteer Forms</span>
          </NavLink>
          <NavLink
            to="/app/contact-forms"
            className="flex items-center space-x-2 py-3 px-5 hover:bg-green-500 hover:text-white transition-all ease-in"
          >
            <MdOutlineContactPhone /> <span>Contact Forms</span>
          </NavLink>
          <NavLink
            to="/app/settings"
            className="flex items-center space-x-2 py-3 px-5 hover:bg-green-500 hover:text-white transition-all ease-in"
          >
            <IoIosSettings /> <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      <div className="flex flex-col">
        <a
          className="flex items-center space-x-2 py-3 px-5 hover:bg-green-500 hover:text-white transition-all ease-in"
          href="https://hungertohope.org/"
          target="_blank"
        >
          <FaGlobeAmericas /> <span>Visit Website</span>
        </a>
        <button
          className="flex text-red-500 items-center space-x-2 py-3 px-5 hover:bg-red-500 hover:text-white transition-all ease-in"
          onClick={() => logMeOut()}
        >
          <IoMdExit /> <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
