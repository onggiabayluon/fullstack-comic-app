import comicsToJSON from '@/lib/toJSON/comicsToJSON'
import { getComics } from '@/services/comicService'
import { useEffect, useRef, useState } from 'react'
import SliderCard from '../Card/SliderCard'
import Carousel from '../Carousel/Carousel'

function HomeCarousel() {
  const [comics, setComics] = useState([])
  const SLIDE_LIMIT = 5
  const sliderRef = useRef(null)
  useEffect(() => {
    getComics({ type: 'less', limit: SLIDE_LIMIT }).then((res) =>
      setComics(comicsToJSON(res.results))
    )
  }, [])

  return (
    <Carousel ref={sliderRef}>
      {comics?.length > 0
        ? comics
            .slice(0, SLIDE_LIMIT)
            .map((item) => <SliderCard key={item.slug || item.id} {...item} />)
        : null}
    </Carousel>
  )
}

export default HomeCarousel
