import comicsToJSON from '@/lib/toJSON/comicsToJSON'
import { getComics } from '@/services/comicService'
import { useEffect, useRef, useState } from 'react'
import SliderCard from '../Card/SliderCard'
import Carousel from '../Carousel/Carousel'
import PictureGroupSkeleton from '../Skeleton/PictureGroupSkeleton'

function HomeCarousel() {
  const [comics, setComics] = useState([])
  const [loading, setLoading] = useState(true)
  const SLIDE_LIMIT = 5
  const sliderRef = useRef(null)

  useEffect(() => {
    getComics({ type: 'less', limit: SLIDE_LIMIT }).then((res) => {
      setComics(comicsToJSON(res.results))
      setLoading(false)
    })
  }, [])

  return loading ? (
    <div className="flex space-x-3 overflow-hidden">
      <PictureGroupSkeleton className={'2xl:w-[79vw]'} height={384} />
      <PictureGroupSkeleton className={'sm:block 2xl:hidden'} height={384} />
      <PictureGroupSkeleton className={'hidden sm:block 2xl:hidden'} height={384} />
      <PictureGroupSkeleton className={'hidden sm:block 2xl:hidden'} height={384} />
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
