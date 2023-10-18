import React from 'react';
import "./Carousel.css";

function Carousel() {
  return (
    <div class="300-px-wide">
    <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
        <img src="https://www.sliderrevolution.com/wp-content/uploads/2023/04/gym-website-templates-2.gif" class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
        <img src="https://images.pexels.com/photos/4325466/pexels-photo-4325466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
        <img src="https://images.pexels.com/photos/1289107/pexels-photo-1289107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" class="d-block w-100" alt="..."/>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>
    </div>
  )
}

export default Carousel