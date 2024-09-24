import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import ThreadProvider from "./Contexts/ThreadProvider";

import GlobalStyles from "./styles/GlobalStyles.styles";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #000;
`;

createRoot(document.getElementById("root")).render(
  <ThreadProvider>
    <GlobalStyles />
    <Wrapper>
      <RouterProvider router={router}></RouterProvider>
    </Wrapper>
  </ThreadProvider>
);
