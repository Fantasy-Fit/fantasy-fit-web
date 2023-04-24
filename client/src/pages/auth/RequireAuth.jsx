import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../store/auth/userSlice";

function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth"  replace />
  );
}

export default RequireAuth;
