import { publicRoutes } from "~/routes";
import Section from "~/components/Section";

export default function Home() {
  return (
    <div className="primary">
      <div className="wrapper">
        <Section title="Recommends" />
        <Section title="Lastest Update" />
      </div>
    </div>
  );
}

Home.layout = publicRoutes.home.layout;
