export default function Thought({ thought }) {
  return (
    <li className="font-medium">
      {thought.thought}
      <small className="block space-x-2 italic">
        <span>{thought.author}</span>
        <time>{thought.date}</time>
        <time>{thought.time}</time>
      </small>
    </li>
  );
}
