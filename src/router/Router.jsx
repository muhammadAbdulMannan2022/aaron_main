import { createBrowserRouter } from "react-router";
import App from "../App";
import LandingLayout from "../pages/landing/LandingLayout";
import AuthLayout from "../pages/Auth/AuthLayout";
import Login from "../pages/Auth/authPages/Login";
import Signup from "../pages/Auth/authPages/Signup";
import ActivationCode from "../pages/Auth/authPages/VerifyOtp";
import ForgotPassword from "../pages/Auth/authPages/ForgotPass";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Projects from "../pages/Dashboard/pages/Projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingLayout />
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />
          },
          {
            path: "signup",
            element: <Signup />
          },
          {
            path: "otp",
            element: <ActivationCode />
          },
          {
            path: "forgot",
            element: <ForgotPassword />
          }
        ]
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Projects />
          }
        ]
      }
    ]
  },
]);
export default router;
