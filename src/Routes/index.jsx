import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Search from "../Pages/Search";
import Login from "../Pages/Login";
import LoginInsta from "../Pages/LoginInsta";
import Follow from "../Pages/Follow";
import Activity from "../Pages/Activity";
import Profile from "../Pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/", // 루트 경로에 Layout 적용
    element: <Layout />, // Layout을 적용
    children: [
      {
        path: "/", // 각 경로는 Outlet을 통해 렌더링됨
        element: <Home />,
      },
      {
        path: "Search",
        element: <Search />,
      },
      {
        path: "Profile",
        element: <Profile />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "LoginInsta",
        element: <LoginInsta />,
      },
      {
        path: "Follow",
        element: <Follow />,
      },
      {
        path: "Activity",
        element: <Activity />,
      },
    ],
  },
]);
