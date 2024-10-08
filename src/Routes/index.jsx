// @ts-nocheck

import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Search from "../Pages/Search";
import Login from "../Pages/Login";
import LoginInsta from "../Pages/LoginInsta";
import Follow from "../Pages/Follow";
import Activity from "../Pages/Activity";
import Profile from "../Pages/Profile";
import PostForm from "../Components/PostForm";
import Insites from "../Pages/Insites";
// import CreateAccount from "../Components/Login/CreateAccount_de";
import CreateAccount from "../Pages/CreateAccount";

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
        path: "Follow",
        element: <Follow />,
      },
      {
        path: "Activity",
        element: <Activity />,
      },
      {
        path: "PostForm",
        element: <PostForm />,
      },
      {
        path: "Insites", // 다은 추가
        element: <Insites />,
      },
    ],
  },
  {
    path: "Login", // 이 라우트는 Layout 바깥에 있음
    element: <Login />,
  },
  {
    path: "LoginInsta", // 이 라우트도 Layout 바깥에 있음
    element: <LoginInsta />,
  },
  {
    path: "CreateAccount", // dan 추가한 라우트
    element: <CreateAccount />,
  },
  {
    path: "Create-Account", // dan 추가한 라우트
    element: <CreateAccount />,
  },
  {
    path: "Login-insta", // 이 라우트도 Layout 바깥에 있음
    element: <LoginInsta />,
  },

  // {
  //   path: "CreateAccount", // dan 추가한 라우트
  //   element: <CreateAccount />,
  // },
]);
