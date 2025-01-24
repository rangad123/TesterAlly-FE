import React, { useState, useEffect, useRef } from "react";
import { 
  MdDashboard, 
  MdBusiness, 
  MdSettings, 
  MdFolder, 
  MdPeopleAlt,
} from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOrganizationSidebarVisible, setIsOrganizationSidebarVisible] = useState(false);
  const [isSettingsSidebarVisible, setIsSettingsSidebarVisible] = useState(false);

  const sidebarRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOrganizationSidebarVisible(false);
        setIsSettingsSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOrganizationSidebar = () => {
    setIsOrganizationSidebarVisible((prevState) => !prevState);
    setIsSettingsSidebarVisible(false);
  };

  const toggleSettingsSidebar = () => {
    setIsSettingsSidebarVisible((prevState) => !prevState);
    setIsOrganizationSidebarVisible(false);
  };

  const handleNavigateToDashboard = () => {
    navigate("/admin-dashboard");
    setIsOrganizationSidebarVisible(false);
    setIsSettingsSidebarVisible(false);
  };

  const handleNavigateToProjects = () => {
    navigate("/admin-projects");
    setIsOrganizationSidebarVisible(false);
  };

  const handleNavigateToUsers = () => {
    navigate("/admin-users");
    setIsOrganizationSidebarVisible(false);
  };

  const handleNavigateToAdminSettings = () => {
    navigate("/admin-settings");
    setIsSettingsSidebarVisible(false);
  };

  const currentPath = location.pathname;

  return (
    <div className="sidebar-container !w-[70px]" ref={sidebarRef}>
      {/* Main Sidebar */}
      <div className="sidebar collapsed">
        <div className="plus-button mt-[40px]"></div>

        {/* Dashboard Option */}
        <div
          className={`sidebar-option ${currentPath === "/admin-dashboard" ? "active" : ""}`}
          onClick={handleNavigateToDashboard}
        >
          <MdDashboard 
            className={`icon project-icon ${currentPath === "/admin-dashboard" ? "active-icon" : ""}`} 
          />
          <div className="option-name-container">
            <span className="option-name">Dashboard</span>
          </div>
        </div>

        {/* Organization Option */}
        <div
          className={`sidebar-option ${location.pathname === "/admin-projects" || location.pathname === "/admin-users" ? "active" : ""}`}
          onClick={toggleOrganizationSidebar}
        >
          <MdBusiness 
            className={`icon project-icon ${location.pathname === "/admin-projects" || location.pathname === "/admin-users" ? "active-icon" : ""}`}
          />
          <div className="option-name-container">
            <span className="option-name">Organization</span>
          </div>
        </div>

        {/* Settings Option */}
        <div
          className={`sidebar-option ${location.pathname === "/admin-settings" ? "active" : ""}`}
          onClick={toggleSettingsSidebar}
        >
          <MdSettings 
            className={`icon project-icon ${location.pathname === "/admin-settings" ? "active-icon" : ""}`} 
          />
          <div className="option-name-container">
            <span className="option-name">Settings</span>
          </div>
        </div>

      </div>

      {/* Sub-sidebar: Organization */}
      {isOrganizationSidebarVisible && (
        <div className="sub-sidebar ml-[70px]">
          <div className="sub-sidebar-header">Organization</div>
          <div 
            className="sub-sidebar-item" 
            onClick={handleNavigateToProjects}
          >
            <MdFolder className="icon" />
            <span>Projects</span>
          </div>
          <div 
            className="sub-sidebar-item" 
            onClick={handleNavigateToUsers}
          >
            <MdPeopleAlt className="icon" />
            <span>Users</span>
          </div>
        </div>
      )}

      {/* Sub-sidebar: Settings */}
      {isSettingsSidebarVisible && (
        <div className= "sub-sidebar-settings ml-[70px]">
          <div className="sub-sidebar-header">Settings</div>
          <div 
            className="sub-sidebar-item" 
            onClick={handleNavigateToAdminSettings}
          >
            <MdSettings className="icon" />
            <span>Admin Settings</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;