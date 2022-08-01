import { publicRoutes } from "~/routes";

export default function Home() {
  return <h1>hello</h1>;
}

Home.layout = publicRoutes.home.layout;
