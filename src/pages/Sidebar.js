import React, { useState } from "react";
import {
  FaBars,
  FaFolderPlus,
  FaTasks,
  FaRegFolderOpen,
  FaCogs,
  FaTimes,
  FaUserShield,
  FaUsers,
  FaListUl,
  FaUserFriends,
  FaFlag
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubSidebarVisible, setIsSubSidebarVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); 
  const [isProjectSettingsVisible, setIsProjectSettingsVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => {
      if (prevState) {
        setIsSubSidebarVisible(false);
        setIsSettingsVisible(false); 
        setIsProjectSettingsVisible(false);
      }
      return !prevState;
    });
  };

  const toggleSubSidebar = () => {
    setIsSubSidebarVisible((prevState) => !prevState);
    setIsSettingsVisible(false); 
    setIsProjectSettingsVisible(false);
  };

  const toggleSettingsSidebar = () => {
    setIsSettingsVisible((prevState) => !prevState);
    setIsSubSidebarVisible(false); 
    setIsProjectSettingsVisible(false);
  };

  const toggleProjectSettingsSidebar = () => {
    setIsProjectSettingsVisible((prevState) => !prevState);
    setIsSubSidebarVisible(false);
    setIsSettingsVisible(false);
  };

  const handleNavigateToCreateProject = () => {
    navigate("/create-project");
    setIsSubSidebarVisible(false);
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToCreateTestCases = () => {
    navigate("/create-testcases");
    setIsSubSidebarVisible(false);
  };

  const handleNavigateToTestSuite = () => {
    navigate("/testsuite");
    setIsSubSidebarVisible(false);
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
    setIsSubSidebarVisible(false);
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard-user");
    setIsSubSidebarVisible(false);
  };

  const handleNavigateToUserRoles = () => {
    navigate("/user-roles");
    setIsSettingsVisible(false);
  };

  const handleNavigateToUsers = () => {
    navigate("/users");
    setIsSettingsVisible(false);
  };


  const handleNavigateToProjectDetails = () => {
    navigate("/project-details");
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToProjectMembers = () => {
    navigate("/project-members");
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToRequirementType = () => {
    navigate("/requirement-type");
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToTestCaseTypes = () => {
    navigate("/test-case-types");
    setIsProjectSettingsVisible(false);
  };

  const handleNavigateToTestCasePriorities = () => {
    navigate("/test-case-priorities");
    setIsProjectSettingsVisible(false);
  };

  return (
    <div className="sidebar-container">
      {/* Main Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div className="plus-button" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <FaTimes className="icon" />
          ) : (
            <FaBars className="icon" />
          )}
        </div>

        <div className="sidebar-option" onClick={handleNavigateToDashboard}>
          <MdDashboard className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Dashboard</span>}
        </div>

        <div className="sidebar-option" onClick={toggleSubSidebar}>
          <BiAddToQueue className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Create Project</span>}
        </div>

        <div
          className="sidebar-option"
          onClick={() => {
            navigate("/saved-testcases");
            setIsSubSidebarVisible(false);
            setIsSettingsVisible(false);
          }}
        >
          <FaRegFolderOpen className="icon project-icon" />
          {isSidebarOpen && (
            <span className="option-name">Saved Test Cases</span>
          )}
        </div>

        <div className="sidebar-option" onClick={handleNavigateToProfile}>
          <MdAccountCircle className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Profile</span>}
        </div>

        <div className="sidebar-option" onClick={toggleSettingsSidebar}>
          <FiSettings className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Settings</span>}
        </div>

        <div className="sidebar-option" onClick={toggleProjectSettingsSidebar}>
          <FaCogs className="icon project-icon" />
          {isSidebarOpen && (
            <span className="option-name">Project Settings</span>
          )}
        </div>
      </div>

      {/* Sub-sidebar: Create Project */}
      {isSubSidebarVisible && (
        <div
          className={`sub-sidebar ${
            isSidebarOpen ? "aligned-expanded" : "aligned-collapsed"
          }`}
        >
          <div className="sub-sidebar-header">Create Project Options</div>
          <div
            className="sub-sidebar-item"
            onClick={handleNavigateToCreateProject}
          >
            <FaFolderPlus className="icon" />
            <span>Create Project</span>
          </div>
          <div
            className="sub-sidebar-item"
            onClick={handleNavigateToCreateTestCases}
          >
            <FaTasks className="icon" />
            <span>Create Test Cases</span>
          </div>
          <div
            className="sub-sidebar-item"
            onClick={handleNavigateToTestSuite}
          >
            <FaCogs className="icon" />
            <span>Test Suite</span>
          </div>
        </div>
      )}

      {/* Sub-sidebar: Settings */}
      {isSettingsVisible && (
        <div
          className={`sub-sidebar-settings ${
            isSidebarOpen ? "aligned-expanded" : "aligned-collapsed"
          }`}
        >
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
      {/* Sub-sidebar: Project Settings */}
      {isProjectSettingsVisible && (
        <div
          className={`sub-sidebar-projects ${
            isSidebarOpen ? "aligned-expanded" : "aligned-collapsed"
          }`}
        >
          <div className="sub-sidebar-header">Project Settings</div>
          <div
            className="sub-sidebar-item"
            onClick={handleNavigateToProjectDetails}
          >
            <FaListUl className="icon" />
            <span>Project Details</span>
          </div>
          <div
            className="sub-sidebar-item"
            onClick={handleNavigateToProjectMembers}
          >
            <FaUserFriends className="icon" />
            <span>Project Members</span>
          </div>
          <div
            className="sub-sidebar-item"
            onClick={handleNavigateToRequirementType}
          >
            <FaTasks className="icon" />
            <span>Requirement Type</span>
          </div>
          <div
            className="sub-sidebar-item"
            onClick={handleNavigateToTestCaseTypes}
          >
            <FaCogs className="icon" />
            <span>Test Case Types</span>
          </div>
          <div
            className="sub-sidebar-item"
            onClick={handleNavigateToTestCasePriorities}
          >
            <FaFlag className="icon" />
            <span>Test Case Priorities</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
