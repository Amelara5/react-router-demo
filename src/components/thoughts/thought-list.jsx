import { useAsyncValue } from "react-router-dom";
import Thought from "./thought";

export default function Thoughts({ setThought2Edit }) {
  const items = useAsyncValue();
  return (
    <ul className="list-none space-y-4" data-cy="thought-list">
      {items.map((thought) => (
        <Thought
          key={thought.id}
          thought={thought}
          setThought2Edit={setThought2Edit}
        />
      ))}
    </ul>
  );
}
