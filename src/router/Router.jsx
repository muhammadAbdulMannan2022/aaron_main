import { createBrowserRouter } from "react-router";
import App from "../App";
import LandingLayout from "../landing/LandingLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingLayout />
      }
    ]
  },
]);
export default router;
