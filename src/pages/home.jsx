import { useEffect, useState } from "react";
import Loading from "../components/loading";
import ThoughtList from "../components/thoughts/thought-list";
import apiService from "../services/api";

export default function Home() {
  const [thoughts, setThoughts] = useState(null);

  useEffect(() => {
    apiService.indexThoughts().then((data) => setThoughts(data));
  }, []);

  return thoughts ? <ThoughtList items={thoughts} /> : <Loading />;
}
