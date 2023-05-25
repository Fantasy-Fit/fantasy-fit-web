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
  const [cookies] = useCookies(null);

  useEffect(() => {
    const tryAutoLogin = async () => {
      try {
        const token = cookies.token
        const refresh = cookies.refresh
        let request = await autoLogin({ token: token, refresh: refresh }).unwrap();
        console.log(request);
        if (request.token && request.refresh) {
          navigate("/profile")
          console.log("auto login success")
        } else if (request.error) {
          navigate("/auth")
        }

      } catch (err) {
        console.error(err)
      }
    }
    tryAutoLogin();

  }, []);

  return (
    <div className="auth-login">
      <Login />
    </div>
  );
}

export default Authorization;
