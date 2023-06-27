import { Outlet } from "react-router-dom";
import Header from "./header/header";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Layout() {
  const [currentUser, setCurrentUser] = useCurrentUser();

  return (
    <>
      <Header userStatus={currentUser} setUserStatus={setCurrentUser} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
}
