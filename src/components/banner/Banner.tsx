import React from "react";
import "tw-elements";

const img1 = require("../../asset/banner/banner-1.jpg");
const img2 = require("../../asset/banner/banner-2.jpg");
const img3 = require("../../asset/banner/banner-3.jpg");

const Banner = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide relative"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={0}
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={1}
          aria-label="Slide 2"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={2}
          aria-label="Slide 3"
        />
      </div>
      <div className="carousel-inner relative w-full overflow-hidden">
        <div className="carousel-item active relative float-left w-full">
          <img src={img1} className="block w-full" alt="..." />
          <div className="carousel-caption hidden md:block absolute text-center">
            <h5 className="text-xl text-white">
              Stepback & Create: Fitting in is boring
            </h5>
            <p>
              People who can see their potential, and know what they’re capable
              of, do great things. And while achieving individual and collective
              greatness can be challenging, we know that, together, we can do
              it.
            </p>
          </div>
        </div>
        <div className="carousel-item relative float-left w-full">
          <img src={img2} className="block w-full" alt="..." />
          <div className="carousel-caption hidden md:block absolute text-center">
            <h5 className="text-xl text-white">
              Air Max Scorpion:A new age of air
            </h5>
            <p>
              Introducing a radical system for Air units, moving from simple
              forms into complex new geometries for a unique underfoot
              sensation.
            </p>
          </div>
        </div>
        <div className="carousel-item relative float-left w-full">
          <img src={img3} className="block w-full" alt="..." />
          <div className="carousel-caption hidden md:block absolute text-center">
            <h5 className="text-xl text-white">Nike forward</h5>
            <p>
              It’s game-changing platforms, like Nike Forward, that accelerate a
              culture of innovation at Nike to help protect the planet and the
              future of sport.
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Banner;
