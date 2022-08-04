import { publicRoutes } from "~/routes";
import Section from "~/components/Section";
import ComicCard from "~/components/ComicCard";
import Carousel from "~/components/Carousel";
import ComicCardV2 from "~/components/ComicCardV2";

export default function Home() {
  const breakpoint = {
    xxl: 2,
    xl: 3,
    md: 1,
    sm: 1,
  };

  return (
    <div className="primary">
      <div className="wrapper">
        {/* Recommends Section */}
        <Section title="Recommends" href={"/"}>
          <Carousel breakpoint={breakpoint}>
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
        <Section title="Lastest Update" href={"/"} className="doubleLayoutGrid">
          {[1, 2, 3, 4, 5, 6].map((comic, key) => (
            <ComicCard key={key} className={"border-top border-bottom"} />
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
