import React, { useRef } from "react";
import { MdDashboard, MdFolder, MdAssignment, MdList, MdPeople } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarRef = useRef(null);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const currentPath = location.pathname;

  return (
    <div className="adminsidebar-container" ref={sidebarRef}>
      {/* Main Sidebar */}
      <div className="sidebar collapsed">
        <div className="plus-button mt-[40px]"></div>

        {/* Dashboard Option */}
        <div
          className={`sidebar-option ${currentPath === "/admin-dashboard" ? "active" : ""}`}
          onClick={() => handleNavigate("/admin-dashboard")}
        >
          <MdDashboard className={`icon project-icon ${currentPath === "/admin-dashboard" ? "active-icon" : ""}`} />
          <div className="option-name-container">
            <span className="option-name">Dashboard</span>
          </div>
        </div>

        {/* Users Option */}
        <div
          className={`sidebar-option ${currentPath === "/admin-users" ? "active" : ""}`}
          onClick={() => handleNavigate("/admin-users")}
        >
          <MdPeople className={`icon project-icon ${currentPath === "/admin-users" ? "active-icon" : ""}`} />
          <div className="option-name-container">
            <span className="option-name">Users</span>
          </div>
        </div>

        {/* Projects Option */}
        <div
          className={`sidebar-option ${currentPath === "/admin-projects" ? "active" : ""}`}
          onClick={() => handleNavigate("/admin-projects")}
        >
          <MdFolder className={`icon project-icon ${currentPath === "/admin-projects" ? "active-icon" : ""}`} />
          <div className="option-name-container">
            <span className="option-name">Projects</span>
          </div>
        </div>

        {/* Test Cases Option */}
        <div
          className={`sidebar-option ${currentPath === "/admin-testcases" ? "active" : ""}`}
          onClick={() => handleNavigate("/admin-testcases")}
        >
          <MdAssignment className={`icon project-icon ${currentPath === "/admin-testcases" ? "active-icon" : ""}`} />
          <div className="option-name-container">
            <span className="option-name">Test Cases</span>
          </div>
        </div>

        {/* Test Suites Option */}
        <div
          className={`sidebar-option ${currentPath === "/admin-testsuites" ? "active" : ""}`}
          onClick={() => handleNavigate("/admin-testsuites")}
        >
          <MdList className={`icon project-icon ${currentPath === "/admin-testsuites" ? "active-icon" : ""}`} />
          <div className="option-name-container">
            <span className="option-name">Test Suites</span>
          </div>
        </div>

        {/* Requirements Option */}
        <div
          className={`sidebar-option ${currentPath === "/admin-requirements" ? "active" : ""}`}
          onClick={() => handleNavigate("/admin-requirements")}
        >
          <FaClipboardList className={`icon project-icon ${currentPath === "/admin-requirements" ? "active-icon" : ""}`} />
          <div className="option-name-container">
            <span className="option-name">Requirements</span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AdminSidebar;
