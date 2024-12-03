import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

const Dropdown = ({ toggleDropdown, setIsLoggedIn, setName, setEmail }) => {

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
        toggleDropdown()
      };

  return (
    <div className="absolute top-[110px] left-0 w-40 bg-gray-400 shadow-md z-50">
      <ul className="space-y-2">
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
        <li
          className="flex px-4 py-2 hover:bg-gray-500 cursor-pointer space-x-2 text-xl items-center"
          onClick={handleLogout}
        >
          <RiLogoutBoxLine />
          <span className="font-bold hover:text-white">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
