import Carousel from '@/components/Carousel/Carousel'
import { useEffect, useRef, useState } from 'react'
import SliderCard from '../Card/SliderCard'

function HomeCarousel({ comics }) {
  const [shouldShowSlider, setShouldShowSlider] = useState(false)
  const sliderRef = useRef(null)
  const SLIDE_LIMIT = 5

  useEffect(() => {
    // Waiting for Component mounted first then show slider => prevent layout shift
    // from slider
    setShouldShowSlider(true)
  }, [])

  return (
    comics?.length > 0 &&
    shouldShowSlider && (
      <Carousel ref={sliderRef}>
        {comics?.length > 0
          ? comics
              .slice(0, SLIDE_LIMIT)
              .map((item) => <SliderCard key={item.slug || item.id} {...item} />)
          : null}
      </Carousel>
    )
  )
}

export default HomeCarousel
