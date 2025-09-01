import { createContext, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Sidebar from "./Contents/SideBar";
import TopBar from "./Contents/TopBar";
import { Outlet } from "react-router";
import { Modal } from "../../helpers/Modal";
import { ChangeEmailForm } from "./Contents/modalContent/ChangeEmailForm";
import { ChangePasswordForm } from "./Contents/modalContent/ChangePassword";
import { LogoutConfirmation } from "./Contents/modalContent/Logout";


export const modalContext = createContext({})

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // modals state 
    const [changeEmailFormActive, setChangeEamilFormActive] = useState(false)
    const [changePasswordFormActive, setChangePasswordFormActive] = useState(false)
    const [isLogOut, setIsLogOut] = useState(false)
    const constextData = { changeEmailFormActive, setChangeEamilFormActive, changePasswordFormActive, setChangePasswordFormActive, isLogOut, setIsLogOut }

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            <modalContext.Provider value={constextData}>


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
                    <div className=" flex items-center justify-between ">
                        <TopBar />
                    </div>

                    {/* Main area */}
                    <div className="flex flex-1 h-full overflow-y-auto flex-col bg-[#0f0f0f]">
                        <Outlet />
                    </div>
                </div>
            </modalContext.Provider>
            {/* modals */}
            <Modal isOpen={changeEmailFormActive} onClose={() => {
                setChangeEamilFormActive(false)
            }}>
                <ChangeEmailForm onClose={() => setChangeEamilFormActive(false)} />
            </Modal>
            <Modal isOpen={changePasswordFormActive} onClose={() => {
                setChangePasswordFormActive(false)
            }}>
                <ChangePasswordForm onClose={() => setChangePasswordFormActive(false)} />
            </Modal>
            <Modal isOpen={isLogOut} onClose={() => {
                setIsLogOut(false)
            }}>
                <LogoutConfirmation onConfirm={() => { setIsLogOut(false) }} onCancel={() => setIsLogOut(false)} />
            </Modal>
        </div>
    );
}
