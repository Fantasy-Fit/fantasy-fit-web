import React from "react";
import "./Signup.css";

function Signup() {
  return (
    <div className="signupScreen">
      <form>
        <h1>Sign Up</h1>
        <input
        placeholder="email"
        type="email" />
        <input
        placeholder="password"
        type="password" />
        <input
        placeholder="password confirmation"
        type="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
