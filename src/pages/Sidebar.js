import React, { useState } from "react";
import {
  FaPlus,
  FaFolderPlus,
  FaTasks,
  FaSave,
  FaCogs,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubSidebarVisible, setIsSubSidebarVisible] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => {
      if (prevState) {
        setIsSubSidebarVisible(false);
      }
      return !prevState;
    });
  };

  const toggleSubSidebar = () => {
    setIsSubSidebarVisible((prevState) => !prevState);
  };

  const handleNavigateToCreateProject = () => {
    navigate("/create-project");
    setIsSubSidebarVisible(false); 
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

  return (
    <div className="sidebar-container">
      {/* Main Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div className="plus-button" onClick={toggleSidebar}>
          <FaPlus className="icon" />
        </div>

        <div className="sidebar-option" onClick={toggleSubSidebar}>
          <FaFolderPlus className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Create Project</span>}
        </div>

        <div
          className="sidebar-option"
          onClick={() => {
            navigate("/saved-testcases");
            setIsSubSidebarVisible(false); 
          }}
        >
          <FaSave className="icon project-icon" />
          {isSidebarOpen && (
            <span className="option-name">Saved Test Cases</span>
          )}
        </div>

        <div className="sidebar-option" onClick={handleNavigateToProfile}>
          <FaUserCircle className="icon project-icon" />
          {isSidebarOpen && <span className="option-name">Profile</span>}
        </div>
      </div>

      {/* Sub-sidebar */}
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
          <div className="sub-sidebar-item" onClick={handleNavigateToTestSuite}>
            <FaCogs className="icon" />
            <span>Test Suite</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
