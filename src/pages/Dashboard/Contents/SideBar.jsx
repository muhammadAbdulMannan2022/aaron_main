import { useContext } from "react";
import { AiOutlineLayout } from "react-icons/ai";
import { FaHeadset } from "react-icons/fa6";
import { HiOutlineUserCircle } from "react-icons/hi";
import { LuSquareDashedMousePointer } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";
import { profileContext } from "../DashboardLayout";
import { baseUrl } from "../../../../redux/auth/auth";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, loading, error } = useContext(profileContext);

  const menuItems = [
    { name: "Projects", icon: <AiOutlineLayout />, to: "/dashboard" },
    {
      name: "Subscription Plan",
      icon: <LuSquareDashedMousePointer />,
      to: "/dashboard/priceing",
    },
    {
      name: "Profile",
      icon: <HiOutlineUserCircle />,
      to: "/dashboard/profile",
    },
  ];

  const isActive = (path) => {
    if (path === "/dashboard/profile") {
      return location.pathname.startsWith("/dashboard/profile");
    }
    return location.pathname === path;
  };

  return (
    <div className="w-full h-full text-white flex flex-col justify-between pt-4">
      <div className="px-4">
        <div className="flex items-center justify-center mb-8">
          <img
            src={!loading ? baseUrl + profile.upload_logo : ""}
            className="max-w-full max-h-40"
            alt={!loading ? profile.first_name : ""}
          />
        </div>

        {menuItems.map((item) => (
          <Link
            to={item.to}
            key={item.name}
            className={`flex items-center p-2 my-2 rounded-lg cursor-pointer transition 
              ${
                isActive(item.to)
                  ? "text-[#574bff] font-bold"
                  : "text-text-primary"
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <button
        onClick={() => navigate("/dashboard/supportHub")}
        className="bg-gray-button-bg p-4 flex items-center gap-5 text-lg text-[#574bff] hover:cursor-pointer"
      >
        <FaHeadset />
        <span>Customer Hub</span>
      </button>
    </div>
  );
};

export default Sidebar;
