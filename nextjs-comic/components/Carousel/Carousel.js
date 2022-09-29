import { forwardRef } from 'react'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

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
    slidesToShow: breakpoint.sm.slide,
    slidesToScroll: breakpoint.sm.slide,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    lazyLoad: true,
    // initialSlide: 1,
    // fade: false,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: breakpoint.md.width,
        settings: {
          slidesToShow: breakpoint.md.slide,
          slidesToScroll: breakpoint.md.slide,
          mobileFirst: true,
          centerPadding: '0',
          // fade: false,
        },
      },
      {
        breakpoint: breakpoint.lg.width,
        settings: {
          slidesToShow: breakpoint.lg.slide,
          slidesToScroll: breakpoint.lg.slide,
          mobileFirst: false,
          // Peek Half slide
          centerPadding: '20%',
          // fade: false,
        },
      },
      {
        breakpoint: breakpoint.xl.width,
        settings: {
          slidesToShow: breakpoint.xl.slide,
          slidesToScroll: breakpoint.xl.slide,
          mobileFirst: false,
          centerPadding: '20%',
          // fade: false,
        },
      },
      {
        breakpoint: breakpoint.xxl.width,
        settings: {
          slidesToShow: breakpoint.xxl.slide,
          slidesToScroll: breakpoint.xxl.slide,
          mobileFirst: false,
          centerPadding: '0%',
          // fade: false,
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
