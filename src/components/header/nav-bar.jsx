import { Link } from "react-router-dom";
import { delCookieToken } from "../../services/utils";

export default function NavBar({ userStatus, setUserStatus }) {
  return (
    <nav className="border-b-2">
      <ul className="divide-y bg-slate-500 px-4 sm:flex sm:gap-x-16 sm:divide-y-0 [&>*]:py-4">
        <li>
          <Link to="/about" className="text-blue-500">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-blue-500">
            Contact
          </Link>
        </li>
        <li>
          {userStatus ? (
            <button
              onClick={() => {
                delCookieToken();
                setUserStatus(null);
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-blue-500">
              Login/Register
            </Link>
          )}
          {/* <Link to="/login" className="text-blue-500">
            Login/Register
          </Link> */}
        </li>
      </ul>
    </nav>
  );
}
