import { publicRoutes } from "~/routes";
import Section from "~/components/Section";
import ComicCard from "~/components/ComicCard";
import Carousel from "~/components/Carousel";
import ComicCardV2 from "~/components/ComicCardV2";
import { useRef } from "react";
import utils from "~/utils";

export default function Home() {
  // Get slider ref from [Carousel component] then pass ref to [Section component]
  const sliderRef = useRef(null);

  const comics = utils.dummyData.comics;

  return (
    <div className="primary">
      <div className="wrapper">
        {/* Recommends Section */}
        <Section title="Recommends" passRef={sliderRef} hasNav>
          <Carousel ref={sliderRef}>
            {[1, 2, 3, 4, 5].map((comic, key) => (
              <ComicCardV2
                key={key}
                src={"/GoblinSlayer.jpg"}
                width={200}
                height={300}
                priority
              ></ComicCardV2>
            ))}
          </Carousel>
        </Section>

        {/* Lastest Update Section */}
        <Section title="Lastest Update" doubleLayoutGrid>
          {comics.map((comic, index) => (
            <ComicCard
              key={index}
              comic={comic}
              {...((index == 0 || index == 1) && { borderTop: true })}
              borderBottom
              className={"comic-card__card"}
            ></ComicCard>
          ))}
        </Section>

        {/* <div className="container">
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>

          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mini-card">
            <div className="image"></div>
            <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam quod quaerat harum dolore debitis minus voluptatem
              possimus nulla?
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

Home.layout = publicRoutes.home.layout;
