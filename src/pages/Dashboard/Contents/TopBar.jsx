import React, { useContext, useState } from 'react';
import { CiCircleChevUp } from 'react-icons/ci';
import { IoIosArrowDown, IoIosLogOut } from 'react-icons/io';
import { TbLockPassword } from 'react-icons/tb';
import { TfiEmail } from 'react-icons/tfi';
import { modalContext } from '../DashboardLayout';

const TopBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { setChangeEamilFormActive, setChangePasswordFormActive, setIsLogOut } = useContext(modalContext)

    const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown-container')) {
            setIsDropdownOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full bg-[#0f0f0f] text-main-text flex justify-between items-center py-3 px-5 md:px-12">
            <div>
                <img src="/logo.png" className='h-10 w-auto' height={40} width={150} alt="" />
            </div>
            <div className="dropdown-container relative">
                <div className="flex items-center gap-2">
                    {/* Placeholder for image - replace with your image */}
                    <div className='hidden md:block'>
                        <p className="text-[#5B6269] text-sm">Tea and Table Services Ltd.</p>
                        <p className="text-[#5B6269] text-sm">saijbahamed@gmail.com</p>
                    </div>
                    <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='flex items-center gap-1 hover:cursor-pointer'>
                        <div className="w-8 h-8 bg-main-text rounded-full mr-2 overflow-hidden">
                            <img src="/user.jpg" alt="" />
                        </div>
                        <div >
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">

                        <div
                            className="flex items-center p-2 text-gray-300 hover:bg-gray-700 cursor-pointer rounded-lg"
                        >
                            <span className="mr-2"><CiCircleChevUp /></span>
                            <span>Upgrade package</span>
                        </div>
                        <div onClick={() => {
                            setChangePasswordFormActive(false)
                            setIsLogOut(false)
                            setChangeEamilFormActive(true)
                        }}
                            className="flex items-center p-2 text-gray-300 hover:bg-gray-700 cursor-pointer rounded-lg"
                        >
                            <span className="mr-2"><TfiEmail /></span>
                            <span>Change Email</span>
                        </div>
                        <div
                            onClick={() => {
                                setChangeEamilFormActive(false)
                                setIsLogOut(false)
                                setChangePasswordFormActive(true)
                            }}
                            className="flex items-center p-2 text-gray-300 hover:bg-gray-700 cursor-pointer rounded-lg"
                        >
                            <span className="mr-2"><TbLockPassword /></span>
                            <span>Change password</span>
                        </div>
                        <div
                            onClick={() => {
                                setChangeEamilFormActive(false)
                                setChangePasswordFormActive(false)
                                setIsLogOut(true)
                            }}
                            className="flex items-center p-2 text-gray-300 hover:bg-gray-700 cursor-pointer rounded-lg"
                        >
                            <span className="mr-2"><IoIosLogOut /></span>
                            <span>Log out</span>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;