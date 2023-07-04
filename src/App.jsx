import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Error from "./components/error";
import Layout from "./components/layout";
import { About, Contact, Home, LoginRegister } from "./pages";
import { registerOrLogin } from "./pages/actions";
import { loadThoughts } from "./pages/loaders";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { path: "/about", element: <About /> },
//       { path: "/contact", element: <Contact /> },
//       { path: "/login", element: <LoginRegister /> },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={<Home />}
        loader={loadThoughts}
        action={async ({ request }) => {
          const fd = await request.formData();
          const thoughtWritten = Object.fromEntries(fd);
          console.log(fd);
          console.log(thoughtWritten);
          console.log("Form submitted");
          return null;
        }}
      />
      <Route path="thoughts/:author" element={<Home />} loader={loadThoughts} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/login"
        element={<LoginRegister />}
        action={registerOrLogin}
      />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
