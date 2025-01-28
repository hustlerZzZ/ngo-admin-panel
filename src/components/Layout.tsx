import Sidebar from "./Sidebar.tsx";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
