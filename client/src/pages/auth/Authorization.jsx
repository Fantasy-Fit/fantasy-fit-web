import { useEffect } from "react";
import Login from "./Login";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAutoLoginMutation } from "../../store/auth/authApiSlice";

const tempJWT = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE2ODc2Mjk4MDh9.XlwiPmLb5Euc21zvdBSotP-HTp83-wf1HNmV_l60_uU"


function Authorization() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [autoLogin] = useAutoLoginMutation();
  const [cookies] = useCookies(null);

  useEffect(() => {
    // if (user != null) {
    //   navigate("/profile");
    // }
    const tryAutoLogin = async () => {
      try {
        const token = cookies.token
        let request = await autoLogin({ token: token, refresh: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE2ODc2Mjk4MDh9.XlwiPmLb5Euc21zvdBSotP-HTp83-wf1HNmV_l60_u" });
        console.log(request);
        if (request.token && request.refresh) {
          // this is fine
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
