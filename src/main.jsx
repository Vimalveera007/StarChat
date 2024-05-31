import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { SignIn, CreateProfile, Home, Post } from "@/screens";
import SignupPage from "@/screens/Signup/SignupPage";
import PrivateRoutes from "@/utils/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignupPage />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/createprofile",
    element: (
      <PrivateRoutes>
        <CreateProfile />
      </PrivateRoutes>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoutes>
        <Home />
      </PrivateRoutes>
    ),
  },
  {
    path: "/post",
    element: (
      <PrivateRoutes>
        <Post />
      </PrivateRoutes>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
