import { useDispatch } from "react-redux";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks.ts";
import { setUser } from "../redux/features/user/userSlice.ts";
import { loggedIn, loggedOut } from "../redux/features/auth/authSlice.ts";
import { useVerifyMeMutation } from "../redux/features/user/userApiSlice.ts";

export default function AuthCheck({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [verifyMe] = useVerifyMeMutation();
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    async function checkAuth() {
      try {
        const userData = await verifyMe({}).unwrap();
        if (userData.status === "success") {
          dispatch(loggedIn());
          dispatch(setUser(userData.user));
        } else {
          dispatch(loggedOut());
        }
      } catch (err) {
        console.error("Error verifying token:", err);
        dispatch(loggedOut());
      }
    }

    checkAuth();
  }, [verifyMe, dispatch]);

  useEffect(() => {
    if (isLoggedIn && !window.location.pathname.startsWith("/app")) {
      navigate("/app");
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
}
