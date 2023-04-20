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
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url('https://media.istockphoto.com/id/1151850199/photo/sports-equipment-and-accessories-shoes-dumbbells-on-green-background.jpg?s=612x612&w=0&k=20&c=OStHn9MFqxyvOPVbo8qr_MHaivayxrs1mnL2APzRAis=')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          FitLeague
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
