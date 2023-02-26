import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { DataProvider } from "./context/DataProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserInfo from "./components/UserInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/user/:userid",
    element: <UserInfo />,
  },
]);
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      // theme="light"
    />
  </DataProvider>
);
