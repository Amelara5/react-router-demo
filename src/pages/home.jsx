import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Loading from "../components/loading";
import ThoughtList from "../components/thoughts/thought-list";

export default function Home() {
  const { thoughts } = useLoaderData();
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={thoughts}>
        <ThoughtList />
      </Await>
    </Suspense>
  );
}
