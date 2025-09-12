import { createContext, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import { LuArrowLeft } from "react-icons/lu";
import { Modal } from "../../../../helpers/Modal";
import { HappyPathSetup } from "../../Contents/modalContent/HappyPath";

const invoiceFlowDataTemp = {
  actual: [
    {
      id: "1",
      label: "Invoice created",
      value: "3000",
      status: "completed",
      owner: "Finance Team",
      descriptions: [
        "The invoice is generated in the system.",
        "Finance team ensures all details are correct.",
      ],
    },
    {
      id: "2",
      label: "Invoice sent",
      value: "1500",
      status: "in-progress",
      owner: "Sales Team",
      descriptions: [
        "The invoice is forwarded to the client.",
        "Sales team is responsible for sharing and tracking.",
      ],
    },
    {
      id: "3",
      label: "Payment Monitoring",
      value: "1200",
      status: "active",
      owner: "Finance Team",
      descriptions: [
        "Finance team monitors incoming payments.",
        "System checks overdue or pending payments.",
      ],
    },
    {
      id: "4",
      label: "Payment Received",
      value: "1500",
      status: "pending",
      owner: "Finance Team",
      descriptions: [
        "The client payment is received.",
        "Pending confirmation in the financial system.",
      ],
    },
    {
      id: "5",
      label: "Receipt reconciled",
      value: "3000",
      status: "final",
      owner: "Finance Team",
      descriptions: [
        "The receipt is reconciled with the payment records.",
        "Marks the completion of the invoice cycle.",
      ],
    },
  ],
  happy_path: [
    {
      id: "1",
      label: "Invoice created",
      value: "2000",
      status: "completed",
      owner: "Finance Team",
      descriptions: ["Invoice drafted and validated by Finance."],
    },
    {
      id: "2",
      label: "Invoice sent",
      value: "1000",
      status: "completed",
      owner: "Sales Team",
      descriptions: ["Invoice successfully delivered to client."],
    },
    {
      id: "3",
      label: "Payment Received",
      value: "1000",
      status: "completed",
      owner: "Finance Team",
      descriptions: ["Client payment confirmed by Finance."],
    },
    {
      id: "4",
      label: "Receipt reconciled",
      value: "2000",
      status: "final",
      owner: "Finance Team",
      descriptions: ["Final step — records reconciled with receipt."],
    },
  ],
  bottlenecks: [
    {
      id: "1",
      label: "Invoice created",
      value: "3000",
      status: "completed",
      owner: "Finance Team",
      descriptions: ["Standard invoice creation without issues."],
    },
    {
      id: "2",
      label: "Invoice approval",
      value: "2500",
      status: "in-progress",
      owner: "Management Team",
      descriptions: [
        "Management approval required before sending invoice.",
        "Often a bottleneck due to long review times.",
      ],
    },
    {
      id: "3",
      label: "Receipt reconciled",
      value: "3200",
      status: "final",
      owner: "Finance Team",
      descriptions: ["Delayed reconciliation due to approval backlog."],
    },
  ],
  loops: [
    {
      id: "1",
      label: "Invoice created",
      value: "2000",
      status: "completed",
      owner: "Finance Team",
      descriptions: ["Invoice created as the starting point."],
    },
    {
      id: "2",
      label: "Invoice sent",
      value: "1500",
      status: "in-progress",
      owner: "Sales Team",
      hasLoop: true,
      loopConnections: { from: "2", to: "3" },
      descriptions: [
        "Invoice sent to client.",
        "May loop back if payment not received on time.",
      ],
    },
    {
      id: "3",
      label: "Payment Monitoring",
      value: "1200",
      status: "active",
      owner: "Finance Team",
      // hasLoop: true,
      // loopConnections: { from: "3", to: "2" },
      descriptions: [
        "Finance monitors client’s payment status.",
        "If overdue, loops back to Sales for follow-up.",
      ],
    },
    {
      id: "4",
      label: "Payment Received",
      value: "1500",
      status: "pending",
      owner: "Finance Team",
      descriptions: ["Payment received successfully."],
    },
  ],
};

export const FlowContext = createContext({});

export function ProcessEfficiencyLayout() {
  const [invoiceFlowData] = useState(invoiceFlowDataTemp);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const location = useLocation();
  const [descriptionsToShow, setDescriptionsToShow] = useState([]);
  const [editHappyPath, setIsHappyPath] = useState(false);

  useEffect(() => {
    console.log(descriptionsToShow);
  }, [descriptionsToShow]);

  return (
    <FlowContext.Provider
      value={{
        steps: invoiceFlowData,
        descriptionsToShow,
        setDescriptionsToShow,
        editHappyPath,
        setIsHappyPath,
      }}
    >
      <div className="h-full flex flex-col">
        <header className="flex flex-col items-start justify-center pt-4 gap-4 border-b border-gray-button-bg bg-background px-6">
          <div className="text-text-notActive flex w-full justify-between pt-5 md:pt-2">
            <div className="flex items-center gap-3 border border-gray-button-bg p-1 rounded-md hover:cursor-pointer px-3">
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
                  className={`hover:text-[#4DA6FF] py-2 text-xs md:text-base ${
                    location.pathname.includes(
                      "/dashboard/v1/process_efficiency"
                    )
                      ? "text-[#4DA6FF] border-b-2"
                      : "text-text-notActive"
                  }`}
                >
                  Process Efficiency
                </Link>
                <Link
                  to="/dashboard/v1/kpi_dashboard"
                  className={`hover:text-[#4DA6FF] py-2 text-xs md:text-base ${
                    location.pathname === "/dashboard/v1/kpi_dashboard"
                      ? "text-[#4DA6FF] border-b-2"
                      : "text-text-notActive"
                  }`}
                >
                  KPI Dashboard
                </Link>
                <Link
                  to="/dashboard/v1/benchmarks"
                  className={`hover:text-[#4DA6FF] py-2 text-xs md:text-base ${
                    location.pathname.includes("/dashboard/v1/benchmarks")
                      ? "text-[#4DA6FF] border-b-2"
                      : "text-text-notActive"
                  }`}
                >
                  Benchmarks
                </Link>
                <Link
                  to="/dashboard/v1/ai"
                  className={`hover:text-[#4DA6FF] py-2 text-xs md:text-base ${
                    location.pathname === "/dashboard/v1/ai"
                      ? "text-[#4DA6FF] border-b-2"
                      : "text-text-notActive"
                  }`}
                >
                  Simulation
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="flex-1 flex min-h-0 ">
          <main className="flex-1 w-full h-full min-h-0 ">
            <Outlet />
          </main>

          {location.pathname.includes("/dashboard/v1/process_efficiency") && (
            <aside
              className={`w-80 shadow-md shadow-gray-700 bg-main-bg border-l border-sidebar-border transform transition-transform duration-200 ease-in-out ${
                rightSidebarOpen ? "translate-x-0" : "translate-x-full"
              } lg:translate-x-0 lg:block fixed lg:static right-0 z-50 lg:z-auto h-auto`}
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
                  {descriptionsToShow.length > 0 &&
                    descriptionsToShow.map((data, i) => (
                      <div
                        className="text-white border border-gray-button-bg p-2 rounded-md"
                        key={i}
                      >
                        <p>{data}</p>
                      </div>
                    ))}
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
