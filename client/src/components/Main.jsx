import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import HeaderOption from "./HeaderOption";
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
      <div class="container-fluid">
        <NavBar/>
      </div>
      <div class="row">
        <Carousel/>
      </div>
      <div class="container-xxl">
        <div class="row mt-5">
          <div class="col-6">
            <img src="https://img.freepik.com/free-photo/outdoor-shot-active-dark-skinned-man-running-morning-has-regular-trainings-dressed-tracksuit-comfortable-sneakers-concentrated-into-distance-sees-finish-far-away_273609-29401.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1697500800&semt=sph" class="rounded img-fluid" alt="..."/>
          </div>
          <div class="col-6 bg-light rounded">
            <h2 class="text-center">Create and Join Fitness Competitions</h2>
            <p class="p-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam arcu, pellentesque sit amet elementum id, ultrices non mi. Donec erat sem, condimentum nec elit sit amet, maximus volutpat augue. Etiam diam ante, feugiat eu dolor nec, condimentum congue tortor. Nulla dictum ut erat vitae fringilla. Phasellus ultricies ex at porta vestibulum. Phasellus lacinia malesuada orci, vel egestas ipsum blandit vel. Duis vulputate aliquam leo, sed lacinia lorem accumsan sed. Vestibulum vulputate purus et tortor porta, at ullamcorper quam mollis. Sed eu dui at velit luctus dignissim vitae sit amet diam.</p>
            <button type="button" class="btn btn-warning">Sign Up</button>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-6 bg-light rounded">
            <h2 class="text-center">Upload Your Workouts</h2>
            <p class="p-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam arcu, pellentesque sit amet elementum id, ultrices non mi. Donec erat sem, condimentum nec elit sit amet, maximus volutpat augue. Etiam diam ante, feugiat eu dolor nec, condimentum congue tortor. Nulla dictum ut erat vitae fringilla. Phasellus ultricies ex at porta vestibulum. Phasellus lacinia malesuada orci, vel egestas ipsum blandit vel. Duis vulputate aliquam leo, sed lacinia lorem accumsan sed. Vestibulum vulputate purus et tortor porta, at ullamcorper quam mollis. Sed eu dui at velit luctus dignissim vitae sit amet diam.</p>
            <button type="button" class="btn btn-warning">Sign Up</button>
          </div>
          <div class="col-6">
            <img src="https://prod-ne-cdn-media.puregym.com/media/819394/gym-workout-plan-for-gaining-muscle_header.jpg?quality=80" class="rounded img-fluid" alt="..."/>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <img src="https://media.self.com/photos/6398b36c72eb56f726777d06/4:3/w_2560%2Cc_limit/weekly-workout-schedule.jpeg" class="rounded img-fluid" alt="..."/>
          </div>
          <div class="col-6 bg-light rounded">
            <h2 class="text-center">Track Your Progress On Leaderboard</h2>
            <p class="p-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam arcu, pellentesque sit amet elementum id, ultrices non mi. Donec erat sem, condimentum nec elit sit amet, maximus volutpat augue. Etiam diam ante, feugiat eu dolor nec, condimentum congue tortor. Nulla dictum ut erat vitae fringilla. Phasellus ultricies ex at porta vestibulum. Phasellus lacinia malesuada orci, vel egestas ipsum blandit vel. Duis vulputate aliquam leo, sed lacinia lorem accumsan sed. Vestibulum vulputate purus et tortor porta, at ullamcorper quam mollis. Sed eu dui at velit luctus dignissim vitae sit amet diam.</p>
            <button type="button" class="btn btn-warning">Sign Up</button>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-6 bg-light rounded">
            <h2 class="text-center">Share With Your Friends</h2>
            <p class="p-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam arcu, pellentesque sit amet elementum id, ultrices non mi. Donec erat sem, condimentum nec elit sit amet, maximus volutpat augue. Etiam diam ante, feugiat eu dolor nec, condimentum congue tortor. Nulla dictum ut erat vitae fringilla. Phasellus ultricies ex at porta vestibulum. Phasellus lacinia malesuada orci, vel egestas ipsum blandit vel. Duis vulputate aliquam leo, sed lacinia lorem accumsan sed. Vestibulum vulputate purus et tortor porta, at ullamcorper quam mollis. Sed eu dui at velit luctus dignissim vitae sit amet diam.</p>
            <button type="button" class="btn btn-warning">Sign Up</button>
          </div>
          <div class="col-6">
            <img src="https://blog.anytimefitness.co.uk/wp-content/uploads/2019/06/2019_214_females_functional_high_five-5078x2539.jpg" class="rounded img-fluid" alt="..."/>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <img src="https://media.istockphoto.com/id/682150858/photo/marathon-runners-close-up-legs-and-shoes.jpg?s=612x612&w=0&k=20&c=NqbMBEhyOvp1hd6H12IiijavdEeWWuEiCslYhUOa3ik=" class="rounded img-fluid" alt="..."/>
          </div>
          <div class="col-6 bg-light rounded">
            <h2 class="text-center">Play for Fun or For Charity</h2>
            <p class="p-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam arcu, pellentesque sit amet elementum id, ultrices non mi. Donec erat sem, condimentum nec elit sit amet, maximus volutpat augue. Etiam diam ante, feugiat eu dolor nec, condimentum congue tortor. Nulla dictum ut erat vitae fringilla. Phasellus ultricies ex at porta vestibulum. Phasellus lacinia malesuada orci, vel egestas ipsum blandit vel. Duis vulputate aliquam leo, sed lacinia lorem accumsan sed. Vestibulum vulputate purus et tortor porta, at ullamcorper quam mollis. Sed eu dui at velit luctus dignissim vitae sit amet diam.</p>
            <button type="button" class="btn btn-warning">Sign Up</button>
          </div>
        </div>
      </div>
      <div class="container-fluid text-center pt-5">
        <h2>Current Competitions</h2>
      </div>
      <Footer/>
    </div>
  );
}

export default Main;
