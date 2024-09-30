import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";

// 레이아웃 스타일
const LayoutWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 20px 20px;
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <Nav />
      <Sidebar />
      <Outlet />
    </LayoutWrapper>
  );
};

export default Layout;
