import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import AuthProvider from "./contexts/auth/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer />
  </AuthProvider>
);

export default App;
