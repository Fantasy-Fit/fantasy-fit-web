import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";


function Main() {
  const navigate = useNavigate();

  function getStarted() {
    navigate("/auth");
  }
  return (
    <div className="main">
      <header
        className="banner"
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            FantasyFit
          </h1>
          {/* <h1 className="banner__description">
          Information about the app
        </h1> */}
          <div className="banner__buttons">
            <button onClick={getStarted} className="banner__button">Get Started!</button>
          </div>
        </div>

        <div className="banner--fadeBottom" />
      </header>
    </div>
  );
}

export default Main;
