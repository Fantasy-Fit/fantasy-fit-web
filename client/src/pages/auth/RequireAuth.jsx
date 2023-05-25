import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../store/auth/userSlice";
import Header from "../../components/Header";
import { useCookies } from "react-cookie";
import { useAutoLoginMutation } from "../../store/auth/authApiSlice";
import { useEffect } from "react";

function RequireAuth() {
  // const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const [autoLogin] = useAutoLoginMutation();
  const [cookies, setCookie] = useCookies(null);
  const navigate = useNavigate();

  useEffect(() => {
    tryAutoLogin();
  }, [])

  const tryAutoLogin = async () => {
    try {
      const token = cookies.token
      const refresh = cookies.refresh
      let request = await autoLogin({ token: token, refresh: refresh }).unwrap();
      console.log(request);
      if (request.token && request.refresh) {
        console.log("auto login successful")
        return (
          <div>
            <Header />
            <Outlet />
          </div>
        )
      } else {
        navigate("/auth");
      }

    } catch (err) {
      console.error(err)
    }

  }
}

export default RequireAuth;
