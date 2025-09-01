import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Sidebar from "./Contents/SideBar";

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* Left Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#050505] transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <button
                    className={`absolute top-16 ${isSidebarOpen ? "-right-4 rounded-full" : "-right-8 rounded-r-full"} w-8 h-8 transition-all delay-100 flex items-center justify-center  p-2 bg-gray-button-bg lg:hidden`}
                    onClick={() => setIsSidebarOpen(prev => !prev)}
                >
                    {
                        isSidebarOpen ? <FaChevronLeft className="text-dark-text" /> : <FaChevronRight className="text-dark-text" />
                    }
                </button>
                {/* items */}
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex flex-1 h-full flex-col border">
                {/* Topbar */}
                <div className="h-14 bg-amber-200 flex items-center justify-between px-4">

                </div>

                {/* Main area */}
                <div className="flex flex-1 h-full overflow-y-auto flex-col p-6">
                    {/* your main content */}
                </div>
            </div>
        </div>
    );
}
