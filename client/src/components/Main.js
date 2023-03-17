import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  function getStarted() {
    navigate("/auth");
  }
  return (
    <div className="main">
      <p>I am the Main Page</p>
      <p>Git Image</p>
      <p>Information about the app</p>
      <button onClick={getStarted}>Get Started!</button>
    </div>
  );
}

export default Main;
