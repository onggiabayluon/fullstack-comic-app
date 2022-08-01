import Link from "next/link";
import Button from "~/components/Button";

export default function Custom404() {
  return (
    <main>
      <h1>404 - That page does not seem to exist...</h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <Button primary style={{ display: "block" }}>
          Go home
        </Button>
      </Link>
    </main>
  );
}
