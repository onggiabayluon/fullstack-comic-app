import React, { useRef } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({
  children,
  handleNextSlide,
  handlePrevSlide,
}) {
  const ref = useRef(null);

  handleNextSlide = () => {
    ref.current.slickNext();
  };

  handlePrevSlide = () => {
    ref.current.slickPrev();
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container">
      {/* <button
        onClick={handlePrevSlide}
        className="slick-custom-arrow prev-button"
      >
        prev
      </button>
      <button
        onClick={handleNextSlide}
        className="slick-custom-arrow next-button"
      >
        next
      </button> */}
      <Slider ref={ref} {...settings}>
        {children}
      </Slider>
    </div>
  );
}
