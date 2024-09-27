import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import ThreadProvider from "./Contexts/ThreadProvider";

createRoot(document.getElementById("root")).render(
  <ThreadProvider>
    <RouterProvider router={router}></RouterProvider>
  </ThreadProvider>
);
