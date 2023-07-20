import { Link, useOutletContext, useSubmit } from "react-router-dom";

export default function Thought({ thought }) {
  const [currentUser] = useOutletContext();
  const submit = useSubmit();

  return (
    <li className="font-medium">
      {thought.thought}
      <small className="block space-x-2 italic">
        <Link to={`thoughts/${thought.author}`}>{thought.author}</Link>
        <time>{thought.date}</time>
        <time>{thought.time}</time>
      </small>
      {currentUser === thought.author && (
        <div className="my-2 space-x-2">
          <button className="rounded bg-indigo-300 px-4 py-2">Edit</button>
          <button
            className="rounded bg-indigo-600 px-4 py-2"
            onClick={() => {
              submit(
                { id: thought.id, author: thought.author },
                { method: "DELETE" }
              );
            }}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
