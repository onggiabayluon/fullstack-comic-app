import Carousel from '@/components/Carousel/Carousel'
import comicsToJSON from '@/lib/toJSON/comicsToJSON'
import { getComics } from '@/services/comicService'
import { useEffect, useRef, useState } from 'react'
import SliderCard from '../Card/SliderCard'
import PictureGroupSkeleton from '../Skeleton/PictureGroupSkeleton'

function HomeCarousel() {
  const [comics, setComics] = useState([])
  const [error, setError] = useState(false)
  const SLIDE_LIMIT = 5
  const sliderRef = useRef(null)

  useEffect(() => {
    getComics({ type: 'less', limit: SLIDE_LIMIT })
      .then((res) => setComics(comicsToJSON(res.results)))
      .catch((err) => setError(true))
    // .finally(setComics([]))
  }, [])

  return comics?.length == 0 ? (
    <div className="flex space-x-3 overflow-hidden">
      <PictureGroupSkeleton error={error} className={'2xl:w-[79vw]'} height={384} />
      <PictureGroupSkeleton error={error} className={'sm:block 2xl:hidden'} height={384} />
      <PictureGroupSkeleton error={error} className={'hidden sm:block 2xl:hidden'} height={384} />
      <PictureGroupSkeleton error={error} className={'hidden sm:block 2xl:hidden'} height={384} />
    </div>
  ) : (
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
