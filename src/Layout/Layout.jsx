import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles.styles";
import { lightTheme, darkTheme } from "../styles/GlobalStyles.styles"; // 테마 정의된 파일 가져오기

// 레이아웃 스타일
const LayoutWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 20px 20px;
`;

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <LayoutWrapper>
        <Nav />
        <Sidebar toggleTheme={toggleTheme} />
        <Outlet />
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
