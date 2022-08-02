import getLayout from "~/utils/getLayout";
import "~/components/GlobalStyles/GlobalStyles.scss";

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  // If component like HomePage dont't have getLayout then render it normally
  const defaultLayout = getLayout || ((page) => page);
  const layout = Component.layout;

  return defaultLayout(layout, <Component {...pageProps} />);
}
