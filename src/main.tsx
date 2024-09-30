// @ts-nocheck
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import ThreadProvider from "./Contexts/ThreadProvider";
import ThemeProvider from "./Contexts/ThemeProvider";
import GlobalStyles from "./styles/GlobalStyles.styles";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ThreadProvider>
      <GlobalStyles />
      <RouterProvider router={router}></RouterProvider>
    </ThreadProvider>
  </ThemeProvider>
);
