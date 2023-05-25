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
    // if (user != null) {
    //   navigate("/profile");
    // }
    const tryAutoLogin = async () => {
      try {
        const token = cookies.token
        let request = await autoLogin({ token: token }).unwrap();
        console.log(request)

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
