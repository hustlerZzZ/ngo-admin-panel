import Avatar from "./Avatar.tsx";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="py-4 px-4 border-b border-gray-200 flex items-center justify-between">
      <h2 className="font-bold text-xl">Admin Panel</h2>
      <div className="flex items-center space-x-4">
        <a
          href="https://hungertohope.org/"
          target="_blank"
          className="bg-green-500 hover:bg-green-600 transition-all ease-in px-4 py-2 rounded-full text-white flex justify-center items-center space-x-2"
        >
          <span>Visit Website</span> <FaExternalLinkAlt className="text-xs" />
        </a>
        <Link
          to="/app/blogs/create-new"
          className="bg-green-500 hover:bg-green-600 transition-all ease-in px-4 py-2 rounded-full text-white flex items-center space-x-2"
        >
          <span>New Blog</span> <FaPlusCircle />
        </Link>
        <Avatar />
      </div>
    </header>
  );
}
