import { Link } from "react-router-dom";

export default function Avatar() {
  return (
    <Link
      to="/settings"
      className="flex items-center justify-center border rounded-full h-7 w-7 pt-1"
    >
      H
    </Link>
  );
}
