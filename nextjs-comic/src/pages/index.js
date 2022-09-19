import { useRef } from "react";
import Carousel from "~/components/Carousel";
import ComicCard from "~/components/ComicCard";
import ComicCardV2 from "~/components/ComicCardV2";
import ComicList from "~/components/ComicList";
import Section from "~/components/Section";
import utils from "~/utils";
import { layouts } from "~/utils/getLayout";

export default function Home({ comics }) {
  // Get slider ref from [Carousel component] then pass ref to [Section component]
  const sliderRef = useRef(null);

  const SLIDER_LIMIT = 5;

  return (
    <div className="primary">
      <div className="wrapper">
        {/* Recommends Section */}
        <Section title="Recommends" onSliderRef={sliderRef} hasNav>
          <Carousel ref={sliderRef}>
            {comics?.slice(0, SLIDER_LIMIT).map((comic, key) => (
              <ComicCardV2
                key={comic.id}
                comic={comic}
                // width={200}
                // height={300}
                fill
                priority
              />
            ))}
          </Carousel>
        </Section>

        {/* Lastest Update Section */}
        <Section title="Lastest Update" doubleLayoutGrid>
          <ComicList
            comics={comics}
            Component={ComicCard}
            className={"comic-card__card"}
            borderBottom
            hasBorder
          />
        </Section>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // const comics = getComics();
  const comics = utils.dummyData.comics;

  return {
    props: {
      comics,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 minutes
    revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_IN_1_MINUTE),
  };
}

Home.layout = layouts.home.layout;
