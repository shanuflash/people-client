import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import { LoginProvider } from "./context/LoginProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import AOS from "aos";
import "aos/dist/aos.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  //   {
  //     path: "/trash",
  //     element: <Trash />,
  //   },
]);
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </LoginProvider>
);
