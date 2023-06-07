import { Link, useAsyncError, useRouteError } from "react-router-dom";
export default function Error() {
  const asyncError = useAsyncError();
  const routeError = useRouteError();

  const error = asyncError || routeError;

  return (
    <p className="error">
      {error?.message || "An error ocurred❗"}
      <Link to="/" className="ml-4 text-red-700 hover:text-red-500">
        Go Home 🏠.
      </Link>
    </p>
  );
}
