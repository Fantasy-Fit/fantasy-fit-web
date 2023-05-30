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
    try {
      const token = cookies.token
      const refresh = cookies.refresh
      if (!token || !refresh) {
        return;
      }
      let request = await autoLogin({ token: token, refresh: refresh }).unwrap();
      // console.log(request);
      if (request.token && request.refresh) {
        setCookie("token", request.token);
        setCookie("refresh", request.refresh)
        // navigate('/profile')
      } else {
        navigate("/auth");
      }

    } catch (err) {
      console.error(err)
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
