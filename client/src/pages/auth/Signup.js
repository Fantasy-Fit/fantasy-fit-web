import React from "react";

function Signup() {
  return (
    <div className="signup">
      <p>I am the Signup</p>
      <form>
        <label>Username</label>
        <input />
        <br></br>
        <label>Email</label>
        <input />
        <br></br>
        <label>Password</label>
        <input />
        <br></br>
        <label>Password Confirmation</label>
        <input />
        <br></br>
        <button>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
