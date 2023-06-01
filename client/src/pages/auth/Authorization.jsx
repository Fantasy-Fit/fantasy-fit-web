import { useEffect } from "react";
import Login from "./Login";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAutoLoginMutation } from "../../store/auth/authApiSlice";

function Authorization() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [autoLogin] = useAutoLoginMutation();
  const [cookies, setCookie] = useCookies(null);

  useEffect(() => {
    tryAutoLogin();
  }, []);

  const tryAutoLogin = async () => {
    const token = cookies.token;
    const refresh = cookies.refresh;
    try {
      if (!token || !refresh ||
        token === "undefined" || refresh === "undefined") {
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
    };
  };

  return (
    <div className="auth-login">
      <Login />
    </div>
  );
}

export default Authorization;
