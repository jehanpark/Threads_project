import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import ThreadProvider from "./Contexts/ThreadContext";
import ThemeProvider from "./Contexts/ThemeContext";
import AuthProvider from "./Contexts/AuthContext";
import GlobalStyles from "./styles/GlobalStyles.styles";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <ThreadProvider>
        <GlobalStyles />
        <RouterProvider router={router}></RouterProvider>
      </ThreadProvider>
    </AuthProvider>
  </ThemeProvider>
);
