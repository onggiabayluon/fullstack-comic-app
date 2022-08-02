import { publicRoutes } from "~/routes";
import Section from "~/components/Section";
import ComicSliderCard from "~/components/ComicSliderCard";
import ComicCard from "~/components/ComicCard";
import Carousel from "~/components/Carousel";

export default function Home() {
  return (
    <div className="primary">
      <div className="wrapper">
        {/* Recommends Section */}

        <Section
          title="Recommends"
          href={"/"}
          // className="tripleLayoutGrid"
        >
          <Carousel>
            {[1, 2, 3, 4, 5].map((comic, key) => (
              <ComicSliderCard key={key} />
            ))}
          </Carousel>
        </Section>

        {/* Lastest Update Section */}
        <Section title="Lastest Update" href={"/"} className="doubleLayoutGrid">
          {[1, 2, 3, 4, 5].map((comic, key) => (
            <ComicCard key={key} className={"border-top border-bottom"} />
          ))}
        </Section>
      </div>
    </div>
  );
}

Home.layout = publicRoutes.home.layout;
