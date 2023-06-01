import { useNavigate, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { useCookies } from "react-cookie";
import { useAutoLoginMutation } from "../../store/auth/authApiSlice";
import { useEffect } from "react";

function RequireAuth() {
  const [autoLogin] = useAutoLoginMutation();
  const [cookies, setCookie] = useCookies(null);
  const navigate = useNavigate();

  useEffect(() => {
    tryAutoLogin();
  }, [])

  const tryAutoLogin = async () => {
    const token = cookies.token;
    const refresh = cookies.refresh;
    try {
      if (!token || !refresh || token === "undefined" || refresh === "undefined") {
        throw new Error("No Credentials to Auto-Login");
      } else {
        let request = await autoLogin({ token: token, refresh: refresh }).unwrap();
        if (request.token && request.refresh) {
          // console.log("Auto Login Successful");
          setCookie("token", request.token);
          setCookie("refresh", request.refresh);
          navigate("/profile");
        }
      }
    } catch (err) {
      console.warn(err);
      navigate("/auth");
    }
  }
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default RequireAuth;
