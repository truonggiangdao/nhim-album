import {
  createBrowserRouter,
} from "react-router-dom";

import Home from './pages/Home';
import Register from './pages/Register';
import SignIn from './pages/SignIn';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);