import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Carousel from "./Carousel";
import Footer from "./Footer";

function Main() {
  const navigate = useNavigate();

  function getStarted() {
    navigate("/auth");
  }
  return (
    <div>
      <div className="container-fluid" style={{ 'padding': "0" }}>
        <NavBar />
      </div>
      <div className="row">
        <Carousel />
      </div>
      <div className="container-xxl">
        <div className="row mt-5">
          <div className="col-6">
            <img src="https://img.freepik.com/free-photo/outdoor-shot-active-dark-skinned-man-running-morning-has-regular-trainings-dressed-tracksuit-comfortable-sneakers-concentrated-into-distance-sees-finish-far-away_273609-29401.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1697500800&semt=sph" className="rounded img-fluid" alt="..." />
          </div>
          <div className="col-6 bg-light rounded p-3">
            <h2 className="text-center">Join Fitness Competitions</h2>
            <p className="p-3">Find a public competition to join or create your own competition. Invite friends to join your competition. Customize your settings. Set a start date and off you go! </p>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-light">Search for Competitions..</button>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6 bg-light rounded">
            <h2 className="text-center">Upload Your Workouts</h2>
            <p className="p-3">Whatever your sport is, record your workout in a competition to get points. The harder and longer you go, the more points you get. Record your workout using a Fitness Tracker and let it automatically upload your activity!</p>
            <button type="button" className="btn btn-light">How do I get points?</button>
          </div>
          <div className="col-6">
            <img src="https://prod-ne-cdn-media.puregym.com/media/819394/gym-workout-plan-for-gaining-muscle_header.jpg?quality=80" className="rounded img-fluid" alt="..." />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <img src="https://media.self.com/photos/6398b36c72eb56f726777d06/4:3/w_2560%2Cc_limit/weekly-workout-schedule.jpeg" className="rounded img-fluid" alt="..." />
          </div>
          <div className="col-6 bg-light rounded">
            <h2 className="text-center">Track Your Progress</h2>
            <p className="p-3">Check out your LeaderBoard for daily and weekly updates. How do you rank against your competitors?</p>
            <button type="button" className="btn btn-light">Sign Up</button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6 bg-light rounded">
            <h2 className="text-center">Share With Your Friends</h2>
            <p className="p-3">Share your activity and progress with your friends. Get your friends to join too!</p>
            <button type="button" className="btn btn-light">Sign Up</button>
          </div>
          <div className="col-6">
            <img src="https://blog.anytimefitness.co.uk/wp-content/uploads/2019/06/2019_214_females_functional_high_five-5078x2539.jpg" className="rounded img-fluid" alt="..." />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <img src="https://media.istockphoto.com/id/682150858/photo/marathon-runners-close-up-legs-and-shoes.jpg?s=612x612&w=0&k=20&c=NqbMBEhyOvp1hd6H12IiijavdEeWWuEiCslYhUOa3ik=" className="rounded img-fluid" alt="..." />
          </div>
          <div className="col-6 bg-light rounded">
            <h2 className="text-center">Play for Fun or a Good Cause</h2>
            <p className="p-3">What's your why? Looking to get stronger, faster, better or playing just for fun? Competing for a good cause? Good on you!</p>
            <button type="button" className="btn btn-light">Sign Up</button>
          </div>
        </div>
      </div>
      <div className="container-fluid text-center pt-5">
        <h2>Current Competitions</h2>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
