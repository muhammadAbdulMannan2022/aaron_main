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
import { ProcessEfficiencyLayout } from "../pages/Dashboard/pages/processEfficiency/ProcessEfficiencyLayout";
import Acctual from "../pages/Dashboard/pages/processEfficiency/PARTS/Acctual";
import KpiDashboard from "../pages/Dashboard/pages/KpiDashboard/KpiDashboard";
import BenchmarkTable from "../pages/Dashboard/pages/benchmarks/BeanchmarkTable";
import BeanchmarkReportPage from "../pages/Dashboard/pages/benchmarks/BeanchmarkReport";
import AiSupport from "../pages/Dashboard/pages/AI Support/AiSupport";
import PricingPlan from "../pages/Priceinig/PriceingPlan";
import Profile from "../pages/Dashboard/pages/Profile/Profile";
import EditPrifile from "../pages/Dashboard/pages/Profile/EditProfile";
import SupportHub from "../pages/docs/SupportHub";

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
          },
          {
            path: "v1",
            element: <ProcessEfficiencyLayout />,
            children: [
              {
                path: "process_efficiency",
                element: <Acctual />
              },
              {
                path: "kpi_dashboard",
                element: <KpiDashboard />
              },
              {
                path: "benchmarks",
                element: <BenchmarkTable />
              },
              {
                path: "benchmarks/report",
                element: <BeanchmarkReportPage />
              },
              {
                path: "ai",
                element: <AiSupport />
              }
            ]
          },
          {
            path: "priceing",
            element: <PricingPlan />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "profile/edit",
            element: <EditPrifile />
          },
          {
            path: "supportHub",
            element: <SupportHub />
          }

        ]
      }
    ]
  },
]);
export default router;
