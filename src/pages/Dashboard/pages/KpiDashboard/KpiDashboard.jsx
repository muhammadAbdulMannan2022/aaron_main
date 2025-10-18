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
  useGetDashboardsQuery,
} from "../../../../../redux/api/dashboard";

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
  const [mainFilterOpen, setMainFilterOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addDashboardModalOpen, setAddDashboardModalOpen] = useState(false);
  const [dashboardName, setDashboardName] = useState("");

  // rtks
  const { data: dashboards, isLoading: isDashboardsLoading } =
    useGetDashboardsQuery();
  const [createNewDashboard, isLoading] = useCreateNewDashboardMutation();

  // headers
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

  // end headers

  const handleImportConfig = (e) => {
    // const file = e.target.files?.[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     const content = event.target?.result;
    //     importConfig(content);
    //   };
    //   reader.readAsText(file);
    // }
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
    setShowSidebar((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (e.target.closest(".sidebar") || e.target.closest(".add-widget-button"))
      return;
    setShowSidebar(false);
  };

  return (
    <div
      className="h-full flex min-h-0 text-white relative px-5 md:px-8"
      onClick={handleOutsideClick}
    >
      <div className="w-full h-full">
        <header className="sticky top-0 z-[1001] bg-main-bg  py-2">
          <div className="flex items-center justify-between gap-3">
            {/* Left side - Dashboard List dropdown and Sidebar Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative" ref={dashboardDropdownRef}>
                <button
                  onClick={() =>
                    setIsDashboardDropdownOpen(!isDashboardDropdownOpen)
                  }
                  className="flex items-center gap-2 px-4 py-2 text-[#574bff] border border-[#574bff] rounded-lg hover:bg-blue-400/10 hover:cursor-pointer"
                >
                  <span>Dashboard List</span>
                  <ChevronDown size={16} />
                </button>

                {isDashboardDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-[10001]">
                    <div className="py-1">
                      <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#574bff] hover:cursor-pointer">
                        Dashboard 1
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#574bff] hover:cursor-pointer">
                        Dashboard 2
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#574bff] hover:cursor-pointer">
                        Dashboard 3
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Filters button */}
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

            {/* Right side - Save and Actions */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-[#574bff] hover:bg-blue-400/10 rounded-lg hover:cursor-pointer">
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
                      <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#8743FC] flex items-center gap-3 hover:cursor-pointer">
                        <Plus size={16} /> Add widget
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#8743FC] flex items-center gap-3 hover:cursor-pointer">
                        <Edit size={16} /> Edit
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-[#8743FC] flex items-center gap-3 hover:cursor-pointer">
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 ">
          <div className="h-auto  pb-4 mb-20">
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
                  {widgets.map((widget) => (
                    <WidgetCard
                      key={widget.id}
                      widget={widget}
                      onMove={moveWidget}
                      onResize={resizeWidget}
                      onBringToFront={bringToFront}
                      onRemove={(id) => removeWidget(id)}
                    />
                  ))}
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
        <MainFilterDashboard onClose={() => setMainFilterOpen(false)} />
      </Modal>
      <Modal
        isOpen={addDashboardModalOpen}
        onClose={() => setAddDashboardModalOpen(false)}
      >
        <div className="p-6 w-[350px] space-y-5  text-white">
          {/* Input Field */}
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

          {/* Button */}
          <button
            onClick={() => {}}
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
