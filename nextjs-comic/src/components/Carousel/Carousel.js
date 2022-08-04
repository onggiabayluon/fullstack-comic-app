import React, { useRef } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// eslint-disable-next-line react/display-name
const Carousel = React.forwardRef((props, ref) => {
  const breakpoint = {
    xxl: 2,
    xl: 2,
    md: 1,
    sm: 1,
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
      <Slider ref={ref} {...settings}>
        {props.children}
      </Slider>
    </div>
  );
});

export default Carousel;
