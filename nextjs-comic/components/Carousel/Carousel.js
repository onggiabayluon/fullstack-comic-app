import { forwardRef } from 'react'
import Slider from 'react-slick'
// Import css files
// import 'slick-carousel/slick/slick-theme.css'
// import 'slick-carousel/slick/slick.css'

// eslint-disable-next-line react/display-name
const Carousel = forwardRef((props, ref) => {
  const breakpoint = {
    xxl: {
      slide: 3,
      width: 1536,
    },
    xl: {
      slide: 1,
      width: 1280,
    },
    lg: {
      slide: 1,
      width: 1024,
    },
    md: {
      slide: 1,
      width: 768,
    },
    sm: {
      slide: 1,
      width: 640,
    },
  }

  var settings = {
    dots: true,
    infinite: true,
    // adaptiveHeight: true,
    respondTo: 'slider',
    centerMode: true, // CenterMode for peek 20% mobile and css peek only right side in talwind.css file
    centerPadding: '10%',
    // lazyLoad: true,
    // autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    // touchThreshold: 100, // ❌
    swipeToSlide: true,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: breakpoint.md.width,
        settings: {
          slidesToShow: breakpoint.md.slide,
          mobileFirst: true,
          centerPadding: '10%',
          swipeToSlide: true,
        },
      },
      {
        breakpoint: breakpoint.lg.width,
        settings: {
          slidesToShow: breakpoint.lg.slide,
          mobileFirst: false,
          // Peek Half slide
          centerPadding: '20%',
          swipeToSlide: true,
        },
      },
      {
        breakpoint: breakpoint.xl.width,
        settings: {
          slidesToShow: breakpoint.xl.slide,
          mobileFirst: false,
          centerPadding: '20%',
          swipeToSlide: true,
        },
      },
      {
        breakpoint: breakpoint.xxl.width,
        settings: {
          slidesToShow: breakpoint.xxl.slide,
          swipeToSlide: true,
          mobileFirst: false,
          centerPadding: '0',
        },
      },
    ],
  }
  return (
    <Slider ref={ref} {...settings}>
      {props.children}
    </Slider>
  )
})

export default Carousel
