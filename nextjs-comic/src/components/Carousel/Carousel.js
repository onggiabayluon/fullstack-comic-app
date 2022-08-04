import React, { useRef } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({
  children,
  breakpoint = {
    xxl: 4,
    xl: 3,
    md: 2,
    sm: 1,
  },
}) {
  const ref = useRef(null);

  const handleNextSlide = () => {
    ref.current.slickNext();
  };

  const handlePrevSlide = () => {
    ref.current.slickPrev();
  };

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: breakpoint.sm,
    slidesToScroll: breakpoint.sm,
    autoplay: true,
    autoplaySpeed: 5000,
    // initialSlide: 1,
    fade: true,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: 880,
        settings: {
          slidesToShow: breakpoint.md,
          slidesToScroll: breakpoint.md,
          mobileFirst: true,
          fade: true,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: breakpoint.xl,
          slidesToScroll: breakpoint.xl,
          mobileFirst: false,
          fade: false,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: breakpoint.xxl,
          slidesToScroll: breakpoint.xxl,
          mobileFirst: false,
          fade: false,
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
