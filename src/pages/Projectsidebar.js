import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaUsers,
  FaList,
  FaCog,
  FaFlag,
  FaFileAlt,
  FaTasks,
  FaClipboardList,
} from "react-icons/fa";

const Projectsidebar = ({ isL1Expanded, isVisible, isProjectSettings }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("Simply Travel (Demo)");
  const [projects, ] = useState(["Simply Travel (Demo)"]);
  const [activeMenuItem, setActiveMenuItem] = useState(""); // Active menu item

  const projectSettingsItems = [
    {
      icon: FaInfoCircle,
      label: "Project Details",
      onClick: () => {
        setActiveMenuItem("Project Details");
        navigate("/project-details");
      },
    },
    {
      icon: FaUsers,
      label: "Project Members",
      onClick: () => {
        setActiveMenuItem("Project Members");
        navigate("/project-members");
      },
    },
    {
      icon: FaList,
      label: "Requirement Types",
      onClick: () => {
        setActiveMenuItem("Requirement Types");
        navigate("/requirement-types");
      },
    },
    {
      icon: FaCog,
      label: "Test Case Types",
      onClick: () => {
        setActiveMenuItem("Test Case Types");
        navigate("/test-case-types");
      },
    },
    {
      icon: FaFlag,
      label: "Test Case Priorities",
      onClick: () => {
        setActiveMenuItem("Test Case Priorities");
        navigate("/test-case-priorities");
      },
    },
  ];

  const testDepartmentItems = [
    {
      icon: FaFileAlt,
      label: "Test Cases",
      onClick: () => {
        setActiveMenuItem("Test Cases");
        navigate("/create-testcases");
      },
    },
    {
      icon: FaList,
      label: "Elements",
      onClick: () => {
        setActiveMenuItem("Elements");
        navigate("/elements");
      },
    },
    {
      icon: FaClipboardList,
      label: "Test Data Profiles",
      onClick: () => {
        setActiveMenuItem("Test Data Profiles");
        navigate("/test-data-profiles");
      },
    },
    {
      icon: FaList,
      label: "Requirements",
      onClick: () => {
        setActiveMenuItem("Requirements");
        navigate("/requirements");
      },
    },
    {
      icon: FaTasks,
      label: "Test Suites",
      onClick: () => {
        setActiveMenuItem("Test Suites");
        navigate("/test-suites");
      },
    },
  ];

  const menuItems = isProjectSettings ? projectSettingsItems : testDepartmentItems;

  const filteredProjects = projects.filter((project) =>
    project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isVisible) return null;

  return (
    <div
  className={`fixed ${isL1Expanded ? "left-64" : "left-16"} top-16 h-[calc(100%-4rem)] w-64 bg-white border-l border-gray-200 transition-all duration-300 ease-in-out md:block`}
>
      <div
        className="relative w-4/5 p-2 bg-white border border-purple-600 rounded-md flex justify-between items-center cursor-pointer mt-[30px] left-1/2 transform -translate-x-1/2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-black">{selectedProject}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isDropdownOpen && (
        <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-10">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="max-h-[200px] overflow-y-auto text-black">
            {filteredProjects.map((project) => (
              <div
                key={project}
                onClick={() => {
                  setSelectedProject(project);
                  setIsDropdownOpen(false);
                  setSearchTerm("");
                }}
                className="p-2 cursor-pointer hover:bg-blue-100"
              >
                {project}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-y-none mt-4">
        {isProjectSettings && (
          <div className="flex justify-center text-lg text-gray-500 p-2">Project Settings</div>
        )}

        {!isProjectSettings && (
          <div className="flex justify-center text-lg text-gray-500 p-2">Test Development</div>
        )}

        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`sub-sidebar-item flex items-center gap-2 p-2 cursor-pointer ${
              activeMenuItem === item.label ? "bg-[#9ac5e2] text-white" : "text-gray-700"
            } hover:bg-blue-100`}
            onClick={() => {
              setActiveMenuItem(item.label);
              item.onClick && item.onClick();
            }}
          >
            <item.icon className="icon" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projectsidebar;
