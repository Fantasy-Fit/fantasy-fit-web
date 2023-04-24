import React, { useEffect } from "react";
import Login from "./Login";
// import Signup from "./Signup";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Authorization() {
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user != null) {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="auth-login">
      <Login />
    </div>
    /* <div className="auth-signup">
        <Signup />
      </div> */
  );
}

export default Authorization;
