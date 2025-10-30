import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  Download,
  Upload,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Layout,
  X,
} from "lucide-react";
import { useDashboard } from "../../../../hooks/useDashboard";
import { DndContext } from "@dnd-kit/core";
import WidgetCard from "../../Widgets/LineChart";
import AddWidgetSidebar from "./AddItemsSidebar";
import "react-resizable/css/styles.css";
import { Modal } from "../../../../helpers/Modal";
import MainFilterDashboard from "../../Contents/modalContent/MainFilterDashboard";
import {
  useCreateNewDashboardMutation,
  useDeleteDashboardMutation,
  useGetDashboardsQuery,
  useUpdateDashboardMutation,
} from "../../../../../redux/api/dashboard";
import { useCallRtk } from "../../../../hooks/useCallRtk";

export default function KpiDashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const {
    widgets,
    canvasSize,
    addWidget,
    moveWidget,
    resizeWidget,
    bringToFront,
    removeWidget,
    exportConfig,
    importConfig,
  } = useDashboard();

  // --- Static demo data for widgets (temporary) ---
  const demoWidgetData = {
    "line-chart": {
      title: "Revenue Over Time",
      data: [
        { month: "Jan", value: 120 },
        { month: "Feb", value: 210 },
        { month: "Mar", value: 150 },
        { month: "Apr", value: 300 },
        { month: "May", value: 250 },
        { month: "Jun", value: 330 },
      ],
      lines: [{ dataKey: "value", color: "var(--color-chart-main)" }],
    },
    "bar-chart": {
      title: "Top Categories",
      data: [
        { name: "A", value: 120 },
        { name: "B", value: 90 },
        { name: "C", value: 150 },
        { name: "D", value: 70 },
      ],
      orientation: "horizontal",
    },
    "pie-chart": {
      title: "Distribution",
      data: [
        { name: "Alpha", value: 40, color: "var(--color-chart-main)" },
        { name: "Beta", value: 30, color: "var(--color-chart-2nd)" },
        { name: "Gamma", value: 30, color: "var(--color-chart-thard)" },
      ],
      centerValue: "100",
    },
    "progress-tracker": {
      title: "Completion",
      value: "75%",
      percentage: 75,
    },
    "key-metrics": {
      title: "Active Users",
      value: "2,430",
      chartType: "area",
      data: [
        { value: 20 },
        { value: 35 },
        { value: 25 },
        { value: 45 },
        { value: 30 },
        { value: 55 },
      ],
      percentage: 65,
    },
  };

  const [mainFilterOpen, setMainFilterOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addDashboardModalOpen, setAddDashboardModalOpen] = useState(false);
  const [dashboardName, setDashboardName] = useState("");
  const [dashboardId, setDashboardId] = useState(null);
  const [projectId, setProjectId] = useState(
    () => localStorage.getItem("currentProjectId") || null
  );
  const [activeDashboard, setActiveDashboard] = useState(null);

  // Filters
  const [selectedDateRange, setSelectedDateRange] = useState(["", ""]);
  const [selectedVarients, setSelectedVarients] = useState([]);
  const [cycleTime, setCycleTime] = useState(["", ""]);

  // Loading state for data
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [widgetData, setWidgetData] = useState({}); // Fetched data for widgets
  const prevWidgetsRef = useRef([]); // Store previous widgets to detect changes
  const prevFiltersRef = useRef({}); // Store previous filters to detect changes

  // RTK Queries
  const {
    data: dashboards,
    refetch,
    isLoading: isDashboardsLoading,
  } = useGetDashboardsQuery(projectId, { skip: !projectId });
  const [createNewDashboard, { isLoading: isCreating }] =
    useCreateNewDashboardMutation();
  const [updateDashboard, { isLoading: isUpdating }] =
    useUpdateDashboardMutation();
  const { callRtk } = useCallRtk();
  // delete dashboard
  const [deleteDashboard] = useDeleteDashboardMutation();

  // Fetch data function
  const fetchData = async (name) => {
    try {
      setIsDataLoading(true);
      const { data } = await callRtk(name, {
        projectId,
        dashboardId,
        startTime: selectedDateRange[0],
        endTime: selectedDateRange[1],
        variants: selectedVarients,
        minCycleTime: cycleTime[0],
        maxCycleTime: cycleTime[1],
      });
      return data;
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
      return null;
    } finally {
      setIsDataLoading(false);
    }
  };

  // Helper to detect meaningful widget changes
  const hasWidgetChanged = (prevWidget, currWidget) => {
    return (
      prevWidget.title !== currWidget.title ||
      prevWidget.type !== currWidget.type ||
      JSON.stringify(prevWidget.props) !== JSON.stringify(currWidget.props)
    );
  };

  // Helper to detect filter or projectId changes
  const haveFiltersChanged = () => {
    const prevFilters = prevFiltersRef.current;
    return (
      JSON.stringify(prevFilters.selectedDateRange) !==
        JSON.stringify(selectedDateRange) ||
      JSON.stringify(prevFilters.selectedVarients) !==
        JSON.stringify(selectedVarients) ||
      JSON.stringify(prevFilters.cycleTime) !== JSON.stringify(cycleTime) ||
      prevFilters.projectId !== projectId
    );
  };

  // Fetch widget data
  const fetchWidgetData = async () => {
    if (!widgets || widgets.length === 0) return;

    setIsDataLoading(true);
    let fetchedData = { ...widgetData }; // Preserve existing data
    const prevWidgets = prevWidgetsRef.current;

    // If filters or projectId have changed, fetch data for all widgets
    if (haveFiltersChanged()) {
      await Promise.all(
        widgets.map(async (widget) => {
          const data = await fetchData(widget.title);
          fetchedData[widget.id] = data;
        })
      );
    } else {
      // Otherwise, fetch data only for new or changed widgets
      const widgetsToFetch = widgets.filter((widget) => {
        const prevWidget = prevWidgets.find((pw) => pw.id === widget.id);
        if (!prevWidget) return true; // New widget
        return hasWidgetChanged(prevWidget, widget); // Changed widget
      });

      await Promise.all(
        widgetsToFetch.map(async (widget) => {
          const data = await fetchData(widget.title);
          fetchedData[widget.id] = data;
        })
      );
    }

    setWidgetData(fetchedData);
    prevWidgetsRef.current = widgets; // Update previous widgets
    prevFiltersRef.current = {
      selectedDateRange,
      selectedVarients,
      cycleTime,
      projectId,
    }; // Update previous filters
    setIsDataLoading(false);
  };

  // Single useEffect for all triggers
  useEffect(() => {
    fetchWidgetData();
  }, [widgets, selectedDateRange, selectedVarients, cycleTime, projectId]);

  // Headers and dropdown logic
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const dashboardDropdownRef = useRef(null);
  const actionsDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dashboardDropdownRef.current &&
        !dashboardDropdownRef.current.contains(event.target)
      ) {
        setIsDashboardDropdownOpen(false);
      }
      if (
        actionsDropdownRef.current &&
        !actionsDropdownRef.current.contains(event.target)
      ) {
        setIsActionsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dashboards && dashboards.length > 0) {
      setActiveDashboard(dashboards[0]);
      setDashboardId(dashboards[0].id);
      setProjectId(dashboards[0].project);
    }
    setSelectedDateRange(["", ""]);
    setSelectedVarients([]);
    setCycleTime(["", ""]);
  }, [dashboards]);
  // Ensure we have a projectId from local storage on mount so the
  // dashboards query can start normally. Do not call `refetch`
  // before the query has been started by the hook — that causes
  // the "Cannot refetch a query that has not been started yet." error.
  useEffect(() => {
    const localProjectId = localStorage.getItem("currentProjectId");
    if (localProjectId && !projectId) setProjectId(localProjectId);
    localStorage.removeItem("dashboardState");
  }, []);

  const handleImportConfig = (content) => {
    importConfig(content);
  };

  const handleSaveDashboard = async () => {
    const data = localStorage.getItem("dashboardState");
    try {
      const res = await updateDashboard({
        projectId,
        dashboardId,
        data: JSON.parse(data),
      });
      console.log("Dashboard updated:", res);
    } catch (error) {
      console.log("Error updating dashboard:", error);
    }
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const widget = widgets.find((w) => w.id === active.id);
    if (widget) {
      const container = document.querySelector(".canvas-container");
      const containerWidth = container ? container.offsetWidth : 1200;
      const containerHeight =
        typeof canvasSize.height === "number" ? canvasSize.height : 800;
      const newX = Math.max(
        0,
        Math.min(
          containerWidth - widget.size.width,
          widget.position.x + delta.x
        )
      );
      const newY = Math.max(
        0,
        Math.min(
          containerHeight - widget.size.height,
          widget.position.y + delta.y
        )
      );
      moveWidget(widget.id, { x: newX, y: newY });
    }
  };

  const handleToggleSidebar = () => {
    setShowSidebar(true);
  };

  const handleOutsideClick = (e) => {
    if (e.target.closest(".sidebar") || e.target.closest(".add-widget-button"))
      return;
    setShowSidebar(false);
  };

  const createNewDashboardHandler = async () => {
    const projectId = localStorage.getItem("currentProjectId");
    try {
      const res = await createNewDashboard({
        name: dashboardName,
        project: projectId,
      });
      console.log(res, "Dashboard created successfully");
      setAddDashboardModalOpen(false);
    } catch (error) {
      console.log("Error on creating dashboard:", error);
    }
  };

  if (isDashboardsLoading) return <div>Loading...</div>;

  return (
    <div
      className="h-full flex min-h-0 text-white relative px-5 md:px-8"
      onClick={handleOutsideClick}
    >
      <div className="w-full h-full">
        <header className="sticky top-0 z-[1001] bg-main-bg py-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative" ref={dashboardDropdownRef}>
                <button
                  onClick={() =>
                    setIsDashboardDropdownOpen(!isDashboardDropdownOpen)
                  }
                  className="flex items-center gap-2 px-4 py-2 text-[#574bff] border border-[#574bff] rounded-lg hover:bg-blue-400/10 hover:cursor-pointer"
                >
                  <span>
                    {activeDashboard
                      ? activeDashboard.name
                      : "Select Dashboard"}
                  </span>
                  <ChevronDown size={16} />
                </button>

                {isDashboardDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-[10001]">
                    <div className="py-1">
                      {dashboards.length > 0 &&
                        dashboards.map((dashboard) => (
                          <button
                            key={dashboard.id}
                            onClick={() => {
                              localStorage.removeItem("dashboardState");
                              setActiveDashboard(dashboard);
                              setDashboardId(dashboard.id);
                              setProjectId(dashboard.project);
                              handleImportConfig(dashboard.data);
                            }}
                            className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#574bff] hover:cursor-pointer"
                          >
                            {dashboard.name}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setMainFilterOpen(true);
                }}
                className="flex items-center z-[1002] gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg hover:cursor-pointer"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSaveDashboard()}
                className="px-4 py-2 text-[#574bff] hover:bg-blue-400/10 rounded-lg hover:cursor-pointer"
              >
                Save
              </button>

              <div className="relative" ref={actionsDropdownRef}>
                <button
                  onClick={() =>
                    setIsActionsDropdownOpen(!isActionsDropdownOpen)
                  }
                  className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg hover:cursor-pointer"
                >
                  <MoreHorizontal size={20} />
                </button>

                {isActionsDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-[10001]">
                    <div className="py-1">
                      <button
                        onClick={() => setAddDashboardModalOpen(true)}
                        className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#8743FC] flex items-center gap-3 hover:cursor-pointer"
                      >
                        <Layout size={16} /> Create new
                      </button>
                      {/* <button
                        onClick={handleToggleSidebar}
                        className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#8743FC] flex items-center gap-3 hover:cursor-pointer"
                      >
                        <Plus size={16} /> Add widget
                      </button> */}
                      {/* <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#8743FC] flex items-center gap-3 hover:cursor-pointer">
                        <Edit size={16} /> Edit
                      </button> */}
                      <button
                        onClick={async () => {
                          if (
                            !window.confirm(
                              "Delete this dashboard? This cannot be undone."
                            )
                          )
                            return;

                          try {
                            // 1. Delete on the server
                            await deleteDashboard({
                              dashboardId,
                              projectId,
                            }).unwrap();

                            // 2. Remove the saved layout from localStorage
                            localStorage.removeItem("dashboardState");

                            // 3. Reset UI state
                            setActiveDashboard(null);
                            setDashboardId(null);
                            setProjectId(
                              localStorage.getItem("currentProjectId") || null
                            );

                            // 4. If there are other dashboards, switch to the first one
                            if (dashboards?.length > 1) {
                              const remaining = dashboards.filter(
                                (d) => d.id !== dashboardId
                              );
                              const next = remaining[0];
                              setActiveDashboard(next);
                              setDashboardId(next.id);
                              setProjectId(next.project);
                              handleImportConfig(next.data); // load its saved layout
                            } else {
                              // No dashboards left → empty canvas
                              // (useDashboard already returns an empty widgets array when nothing is loaded)
                              handleImportConfig({ widgets: [] });
                            }

                            // 5. Close the dropdown
                            setIsActionsDropdownOpen(false);
                          } catch (err) {
                            console.error("Failed to delete dashboard", err);
                            alert(
                              "Could not delete the dashboard. Please try again."
                            );
                          }
                        }}
                        className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#8743FC] flex items-center gap-3 hover:cursor-pointer"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0">
          <div className="h-auto pb-4 mb-20">
            {widgets.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-md mx-auto">
                  <h3 className="text-xl font-semibold mb-2">
                    Welcome to your Dashboard
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Get started by adding your first widget.
                  </p>
                  <button
                    onClick={handleToggleSidebar}
                    className="px-6 py-3 bg-button-outline rounded-lg hover:bg-button-outline/80 add-widget-button hover:cursor-pointer"
                  >
                    Add Your First Widget
                  </button>
                </div>
              </div>
            ) : (
              <DndContext onDragEnd={handleDragEnd}>
                <div
                  className="relative bg-main-bg rounded-lg overflow-hidden w-full canvas-container"
                  style={{
                    height: canvasSize.height,
                    minHeight: "100%",
                    width: "100%",
                    zIndex: 0,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20 border border-green-800"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {isDataLoading ? (
                    <div className="flex items-center justify-center w-full h-full">
                      loading...
                    </div>
                  ) : (
                    widgets.map((widget) => {
                      const demo = demoWidgetData[widget.type] || {};
                      const fetched = widgetData[widget.id] || {};
                      const widgetWithData = {
                        ...widget,
                        props: {
                          ...(widget.props || {}),
                          ...demo,
                          rtk_data: fetched,
                        },
                      };
                      // console.log(widgetWithData);
                      return (
                        <WidgetCard
                          key={widget.id}
                          widget={widgetWithData}
                          onMove={moveWidget}
                          onResize={resizeWidget}
                          onBringToFront={bringToFront}
                          onRemove={(id) => removeWidget(id)}
                        />
                      );
                    })
                  )}
                </div>
              </DndContext>
            )}
          </div>
        </main>
      </div>

      <div className="sidebar">
        <AddWidgetSidebar
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          onAdd={addWidget}
          onToggle={handleToggleSidebar}
          isopen={showSidebar}
        />
      </div>
      {showSidebar && (
        <div
          className="fixed inset-0 z-[999] bg-black/50"
          onClick={() => setShowSidebar(false)}
        />
      )}
      <Modal isOpen={mainFilterOpen} onClose={() => setMainFilterOpen(false)}>
        <MainFilterDashboard
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          selectedVarients={selectedVarients}
          setSelectedVarients={setSelectedVarients}
          cycleTime={cycleTime}
          setCycleTime={setCycleTime}
          onClose={() => setMainFilterOpen(false)}
        />
      </Modal>
      <Modal
        isOpen={addDashboardModalOpen}
        onClose={() => setAddDashboardModalOpen(false)}
      >
        <div className="p-6 w-[350px] space-y-5 text-white">
          <div className="space-y-2">
            <label
              htmlFor="dashboardName"
              className="text-sm font-medium text-gray-300"
            >
              Dashboard Name
            </label>
            <input
              id="dashboardName"
              type="text"
              placeholder="Enter dashboard name"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <button
            onClick={() => {
              createNewDashboardHandler();
            }}
            disabled={!dashboardName.trim()}
            className={`w-full flex items-center justify-center gap-2 rounded-lg py-2 font-medium transition-colors ${
              dashboardName.trim()
                ? "bg-auth-button-bg hover:bg-opacity-90 text-white hover:cursor-pointer"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            style={{ backgroundColor: "var(--color-auth-button-bg)" }}
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
}
