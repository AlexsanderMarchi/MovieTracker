import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { MovieProvider } from "./contexts/movieContext";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/seach", element: <Search /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MovieProvider>
      <RouterProvider router={router} />
    </MovieProvider>
  </React.StrictMode>
);
