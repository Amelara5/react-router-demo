import { Suspense, useEffect } from "react";
import { Await, useLoaderData, useOutletContext } from "react-router-dom";
import Error from "../components/error";
import Loading from "../components/loading";
import ThoughtList from "../components/thoughts/thought-list";
import { decodeUserFromTokenCookie } from "../services/utils";

export default function Home() {
  const { thoughts } = useLoaderData();
  const [useCurrentUser, setCurrentUser] = useOutletContext();

  useEffect(() => {
    setCurrentUser(decodeUserFromTokenCookie);
  });
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={thoughts} errorElement={<Error />}>
        <h1>{useCurrentUser}</h1>
        <ThoughtList />
      </Await>
    </Suspense>
  );
}
