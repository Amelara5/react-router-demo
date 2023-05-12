import Thought from "./thought";

export default function Thoughts({ items }) {
  return (
    <ol className="list-decimal space-y-4">
      {items.map((thought) => (
        <Thought key={thought.id} thought={thought} />
      ))}
    </ol>
  );
}
