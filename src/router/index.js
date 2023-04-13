import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "../pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
]);