import { createBrowserRouter } from "react-router";
import App from "../App";
import LandingLayout from "../landing/LandingLayout";
import AuthLayout from "../Auth/AuthLayout";
import Login from "../Auth/authPages/Login";
import Signup from "../Auth/authPages/Signup";
import ActivationCode from "../Auth/authPages/VerifyOtp";
import ForgotPassword from "../Auth/authPages/ForgotPass";

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
      }
    ]
  },
]);
export default router;
