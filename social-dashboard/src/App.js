import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Connection from "./pages/Connection";
import Settings from "./pages/Settings";
import Friend from "./pages/Friend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "connections", element: <Connection /> },
      { path: "settings", element: <Settings /> },
      { path: "connections/:id", element: <Friend /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
