import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = ({ isOpen, toggleSidebar, isLoggedIn, setIsLoggedIn, setName, setEmail }) => {
  let navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName(null);
    setEmail(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/");
    toast.success("You are successfully logged out!");
  };

  return (
    <div
      className={`fixed left-0   bg-gray-400 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-40 w-40 md:w-64 md:h-full h-64`}
      style={{ top: "52px" }}
    >
      {/* <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Sidebar</h2>
        <button onClick={toggleSidebar} className="text-red-500">
          ✖
        </button>
      </div> */}
      <ul className="mt-20 space-y-2">
        <li className="flex px-4 py-2 hover:bg-gray-500 cursor-pointer space-x-2 text-xl items-center">
          <MdDashboard />
          <a href="dashboard" className="font-bold hover:text-white">
            Dashboard
          </a>
        </li>
        <li className="flex px-4 py-2 hover:bg-gray-500 cursor-pointer space-x-2 text-xl items-center">
          <FaUserCircle />
          <a href="profile" className="font-bold hover:text-white">
            Profile
          </a>
        </li>
        <li className="flex px-4 py-2 hover:bg-gray-500 cursor-pointer space-x-2 text-xl items-center" onClick={handleLogout}>
          <RiLogoutBoxLine />
          <span className="font-bold hover:text-white">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
