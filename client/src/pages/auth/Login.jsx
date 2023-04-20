import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/auth/userSlice";
import { useLoginMutation } from "../../store/auth/authApiSlice";
import "./Login.css";
import Signup from "./Signup";
import LoadingSpinner from "./LoadingSpinner";

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [signIn, setSignIn] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(null);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setUserInfo({ ...userData }));
      setCookie("token", userData.token);
      localStorage.setItem("workouts", JSON.stringify(userData.workouts));
      localStorage.setItem("competitions", JSON.stringify(userData.competitions));
      localStorage.setItem("user", JSON.stringify(userData.user));
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 'Unauthorized') {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-1.png"
          alt="logo"
        />
        <button onClick={() => setSignIn(state => !state)} className="loginScreen__button">
          {signIn ? "Login" : "Sign Up"}
        </button>
        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body" style={{ top: signIn ? "7%" : "24%" }}>
        {signIn ? (
          <Signup setSignIn={setSignIn} />
        ) : (
          <div className="loginScreen__body">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Email Address"
                type="email"
                id="email"
                ref={userRef}
                value={email}
                onChange={handleUserInput}
                autoComplete="off"
                required
              />
              <input
                placeholder="Password"
                type="password"
                id="password"
                onChange={handlePasswordInput}
                value={password}
                required
              />
              <button type="submit">Log In</button>
              <h4>
                <span className="loginScreen__gray"
                >New to FitLeague?</span>
                <span on="true" className="loginScreen__link"
                  onClick={() => setSignIn(state => !state)}>
                  {" "}
                  Sign Up Now
                </span>
              </h4>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  return content;
}

export default Login;
