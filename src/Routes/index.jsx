import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Search from "../Pages/Search";
import Login from "../Pages/Login";
import LoginInsta from "../Pages/LoginInsta";
import Follow from "../Pages/Follow";
import Activity from "../Pages/Activity";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Search",
    element: <Search />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/LoginInsta",
    element: <LoginInsta />,
  },
  {
    path: "/Follow",
    element: <Follow />,
  },
  {
    path: "/Activity",
    element: <Activity />,
  },
]);
