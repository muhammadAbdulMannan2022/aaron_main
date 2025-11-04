import { createContext, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { LuArrowLeft } from "react-icons/lu";
import { Modal } from "../../../../helpers/Modal";
import { HappyPathSetup } from "../../Contents/modalContent/HappyPath";
import {
  useGetIdealPathQuery,
  useGetOrginalPathQuery,
} from "../../../../../redux/api/dashboard";

export const FlowContext = createContext({});

export function ProcessEfficiencyLayout() {
  const location = useLocation();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true); // Default to true for testing
  const [descriptionsToShow, setDescriptionsToShow] = useState([]);
  const [editHappyPath, setIsHappyPath] = useState(false);
  const id = localStorage.getItem("currentProjectId");
  const navigate = useNavigate();

  // Fetch data using RTK Query
  const {
    data: idealPathData,
    isLoading: isLoadingIdeal,
    isError: isErrorIdeal,
  } = useGetIdealPathQuery(id, { skip: !id });
  const {
    data: orginalPathData,
    isLoading: isLoadingOriginal,
    isError: isErrorOriginal,
  } = useGetOrginalPathQuery(id, { skip: !id });

  useEffect(() => {
    console.log("Current pathname:", location.pathname);
    console.log("descriptionsToShow updated:", descriptionsToShow);
  }, [location.pathname, descriptionsToShow]);

  return (
    <FlowContext.Provider
      value={{
        idealPathData,
        orginalPathData,
        isLoadingIdeal,
        isErrorIdeal,
        isLoadingOriginal,
        isErrorOriginal,
        setDescriptionsToShow,
        setIsHappyPath,
      }}
    >
      <div className="h-full flex flex-col">
        <header className="flex flex-col items-start justify-center pt-4 gap-4 border-b border-gray-button-bg bg-background px-6">
          <div className="text-text-notActive flex w-full justify-between pt-5 md:pt-2">
            <div
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 border border-gray-button-bg p-1 rounded-md hover:cursor-pointer px-3"
            >
              <LuArrowLeft />
              <h1>Back</h1>
            </div>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-accent text-foreground"
              onClick={() => setRightSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
          <div>
            <div className="flex-1">
              <nav className="flex space-x-4 pb-2">
                <Link
                  to="/dashboard/v1/process_efficiency"
                  className={`hover:text-[#574bff] py-2 text-xs md:text-base ${
                    location.pathname.includes(
                      "/dashboard/v1/process_efficiency"
                    )
                      ? "text-[#574bff] border-b-2"
                      : "text-text-notActive"
                  }`}
                >
                  Process Efficiency
                </Link>
                <Link
                  to="/dashboard/v1/kpi_dashboard"
                  className={`hover:text-[#574bff] py-2 text-xs md:text-base ${
                    location.pathname === "/dashboard/v1/kpi_dashboard"
                      ? "text-[#574bff] border-b-2"
                      : "text-text-notActive"
                  }`}
                >
                  KPI Dashboard
                </Link>
                <Link
                  to="/dashboard/v1/benchmarks"
                  className={`hover:text-[#574bff] py-2 text-xs md:text-base ${
                    location.pathname.includes("/dashboard/v1/benchmarks")
                      ? "text-[#574bff] border-b-2"
                      : "text-text-notActive"
                  }`}
                >
                  Benchmarks
                </Link>
                <Link
                  to="/dashboard/v1/ai"
                  className={`hover:text-[#574bff] py-2 text-xs md:text-base ${
                    location.pathname === "/dashboard/v1/ai"
                      ? "text-[#574bff] border-b-2"
                      : "text-text-notActive"
                  }`}
                >
                  Simulation
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="flex-1 flex min-h-0">
          <main className="flex-1 w-full h-full min-h-0">
            <Outlet />
          </main>

          {location.pathname.includes("/dashboard/v1/process_efficiency") && (
            <aside
              className={`w-80 shadow-md shadow-gray-700 bg-main-bg border-l border-sidebar-border transform transition-transform duration-200 ease-in-out ${
                rightSidebarOpen ? "translate-x-0" : "translate-x-full"
              } lg:translate-x-0 lg:block fixed lg:static right-0 lg:z-auto z-[999] h-full`}
            >
              <div className="flex flex-col min-h-0">
                <div className="lg:hidden flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
                  <button
                    className="p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
                    onClick={() => setRightSidebarOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
                  {descriptionsToShow.length > 0 ? (
                    descriptionsToShow.map((data, i) => (
                      <div
                        className="text-white border border-gray-button-bg p-2 rounded-md"
                        key={i}
                      >
                        <p>
                          {data === "Cost per hour: 0.0" ? (
                            <span className="text-red-400">
                              Kinkdly define the cost on Simulation
                            </span>
                          ) : data === "Estimated cost per case: 0.0" ? (
                            ""
                          ) : (
                            data
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-white p-2">
                      No descriptions available. Click a step to view details.
                    </div>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>

        {rightSidebarOpen && (
          <div
            className="fixed inset-0 z-[99] bg-black/50 lg:hidden"
            onClick={() => setRightSidebarOpen(false)}
          />
        )}
        <Modal isOpen={editHappyPath} onClose={() => setIsHappyPath(false)}>
          <HappyPathSetup onClose={() => setIsHappyPath(false)} />
        </Modal>
      </div>
    </FlowContext.Provider>
  );
}
