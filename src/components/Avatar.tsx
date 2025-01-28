import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks.ts";

export default function Avatar() {
  const email: string = useAppSelector((state) => state.user.email);

  return (
    <Link
      to="/app/settings"
      className="flex items-center justify-center rounded-full h-7 w-7 pt-1 bg-purple-600 text-white border border-black"
    >
      {email.charAt(0).toUpperCase()}
    </Link>
  );
}
