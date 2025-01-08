import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaFolderPlus,
  FaTasks,
  FaCode,
  FaCogs,
  FaTimes,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import Projectsidebar from "./Projectsidebar";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubSidebarVisible, setIsSubSidebarVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); 
  const [isProjectSettingsVisible, setIsProjectSettingsVisible] = useState(false);
  const [isTestCasesVisible, setIsTestCasesVisible] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSubSidebarVisible(false);
        setIsSettingsVisible(false);
        setIsProjectSettingsVisible(false);
        setIsTestCasesVisible(false);
        
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => {
      if (prevState) {
        setIsSubSidebarVisible(false);
        setIsSettingsVisible(false); 
        setIsProjectSettingsVisible(false);
        setIsTestCasesVisible(false);
      }
      return !prevState;
    });
  };

  const toggleSubSidebar = () => {
    setIsSubSidebarVisible((prevState) => !prevState);
    setIsSettingsVisible(false); 
    setIsProjectSettingsVisible(false);
    setIsTestCasesVisible(false);
  };

  const toggleSettingsSidebar = () => {
    setIsSettingsVisible((prevState) => !prevState);
    setIsSubSidebarVisible(false); 
    setIsProjectSettingsVisible(false);
    setIsTestCasesVisible(false);
  };

  const toggleProjectSettingsSidebar = () => {
    setIsProjectSettingsVisible((prevState) => !prevState);
    setIsSubSidebarVisible(false);
    setIsSettingsVisible(false);
    setIsTestCasesVisible(false);
  };

  const handleNavigateToCreateProject = () => {
    navigate("/create-project");
    setIsSubSidebarVisible(false);
    setIsProjectSettingsVisible(false);
    setIsTestCasesVisible(false);
  };

  const handleNavigateToCreateTestCases = () => {
    navigate("/create-testcases");
    setIsSubSidebarVisible(false);
    setIsTestCasesVisible(true);
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToTestSuite = () => {
    navigate("/testsuite");
    setIsSubSidebarVisible(false);
    setIsTestCasesVisible(false);
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
    setIsSubSidebarVisible(false);
    setIsTestCasesVisible(false);
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard-user");
    setIsSubSidebarVisible(false);
    setIsTestCasesVisible(false);
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToUserRoles = () => {
    navigate("/user-roles");
    setIsSettingsVisible(false);
    setIsTestCasesVisible(false);
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToUsers = () => {
    navigate("/users");
    setIsSettingsVisible(false);
    setIsTestCasesVisible(false);
    setIsProjectSettingsVisible(false);
  };

  const toggleTestCasesSidebar = () => {
    setIsTestCasesVisible((prevState) => !prevState);
    setIsProjectSettingsVisible(false);
    setIsSettingsVisible(false);
    setIsSubSidebarVisible(false);
  };

  return (
    <div className="sidebar-container" ref={sidebarRef}>
      {/* Main Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div className="plus-button" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <FaTimes className="icon menu-icon" />
          ) : (
            <FaBars className="icon menu-icon" />
          )}
        </div>

        {/* Dashboard Option */}
        <div
          className={`sidebar-option ${isSidebarOpen && window.location.pathname === "/dashboard-user" ? "active" : ""}`}
          onClick={handleNavigateToDashboard}
        >
          <MdDashboard className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Dashboard</span>}
        </div>

        {/* Create Project Option */}
        <div
          className={`sidebar-option ${isSidebarOpen && isSubSidebarVisible ? "active" : ""}`}
          onClick={toggleSubSidebar}
        >
          <BiAddToQueue className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Create Project</span>}
        </div>

        {/* Test Development Option */}
        <div
          className={`sidebar-option ${isSidebarOpen && isTestCasesVisible ? "active" : ""}`}
          onClick={toggleTestCasesSidebar}
        >
          <FaCode className="icon icon project-icon" />
          {isSidebarOpen && <span className="option-name">Test Development</span>}
        </div>

        {/* Profile Option */}
        <div
          className={`sidebar-option ${isSidebarOpen && window.location.pathname === "/profile" ? "active" : ""}`}
          onClick={handleNavigateToProfile}
        >
          <MdAccountCircle className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Profile</span>}
        </div>

        {/* Project Settings Option */}
        <div
          className={`sidebar-option ${isSidebarOpen && isProjectSettingsVisible ? "active" : ""}`}
          onClick={toggleProjectSettingsSidebar}
        >
          <FaCogs className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Project Settings</span>}
        </div>

        <Projectsidebar 
          isVisible={isProjectSettingsVisible || isTestCasesVisible} // Keeps Projectsidebar open when either option is active
          isProjectSettings={isProjectSettingsVisible}
          isL1Expanded={isSidebarOpen}
        />

        {/* Settings Option */}
        <div
          className={`sidebar-option ${isSidebarOpen && window.location.pathname === "/settings" ? "active" : ""}`}
          onClick={toggleSettingsSidebar}
        >
          <FiSettings className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Settings</span>}
        </div>

      </div>

      {/* Sub-sidebar: Create Project */}
      {isSubSidebarVisible && (
        <div
          className={`sub-sidebar ${isSidebarOpen ? "aligned-expanded" : "aligned-collapsed"}`}
        >
          <div className="sub-sidebar-header">Create Project Options</div>
          <div className="sub-sidebar-item" onClick={handleNavigateToCreateProject}>
            <FaFolderPlus className="icon" />
            <span>Create Project</span>
          </div>
          <div className="sub-sidebar-item" onClick={handleNavigateToCreateTestCases}>
            <FaTasks className="icon" />
            <span>Create Test Cases</span>
          </div>
          <div className="sub-sidebar-item" onClick={handleNavigateToTestSuite}>
            <FaCogs className="icon" />
            <span>Test Suite</span>
          </div>
        </div>
      )}

      {/* Sub-sidebar: Settings */}
      {isSettingsVisible && (
        <div className={`sub-sidebar-settings ${isSidebarOpen ? "aligned-expanded" : "aligned-collapsed"}`}>
          <div className="sub-sidebar-header">Settings</div>
          <div className="sub-sidebar-item" onClick={handleNavigateToUserRoles}>
            <FaUserShield className="icon" />
            <span>User Roles</span>
          </div>
          <div className="sub-sidebar-item" onClick={handleNavigateToUsers}>
            <FaUsers className="icon" />
            <span>Users</span>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Sidebar;
