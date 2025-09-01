
import { useState } from 'react';
import { AiOutlineLayout } from 'react-icons/ai';
import { FaHeadset } from 'react-icons/fa6';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { LuSquareDashedMousePointer } from 'react-icons/lu';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Projects');

    const menuItems = [
        { name: 'Projects', icon: <AiOutlineLayout /> },
        { name: 'Subscription Plan', icon: <LuSquareDashedMousePointer /> },
        { name: 'Profile', icon: <HiOutlineUserCircle /> },

    ];

    return (
        <div className="w-full h-full text-white flex flex-col justify-between  pt-4">
            <div className="px-4">
                <div className="flex items-center justify-center mb-8">
                    <img src="userClogo.png" className='max-w-full' alt="" />
                </div>
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className={`flex items-center p-2 my-2 rounded-lg cursor-pointer ${activeItem === item.name ? 'text-[#4DA6FF]' : 'text-[#5B6269]'
                            }`}
                        onClick={() => setActiveItem(item.name)}
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.name}</span>
                    </div>
                ))}

            </div>
            {/* { name: 'Customer Hub', icon: <FaHeadset /> }, */}
            <button className='bg-gray-button-bg p-4 flex items-center gap-5 text-lg text-[#4DA6FF] hover:cursor-pointer'>
                <FaHeadset />
                <span>Customer Hub</span>
            </button>
        </div>
    );
};

export default Sidebar;