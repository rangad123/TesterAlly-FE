import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaUsers,
  FaList,
  FaCog,
  FaFlag,
  FaFileAlt,
  FaRegFileAlt,
  FaClipboardList
} from "react-icons/fa";

const ProjectSidebar = ({ isL1Expanded, isVisible }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [isProjectSettingsExpanded, setIsProjectSettingsExpanded] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.warn("No userId found in localStorage");
        return;
      }

      try {
        const response = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/projects/?user_id=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProjects(data);
          
          const savedProject = localStorage.getItem("selectedProject");
          if (savedProject) {
            setSelectedProject(JSON.parse(savedProject));
          } else if (data.length > 0) {
            setSelectedProject(data[0]);
            localStorage.setItem("selectedProject", JSON.stringify(data[0]));
          }
        } else {
          console.error("Failed to fetch projects:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    localStorage.setItem("selectedProject", JSON.stringify(project));
    setIsDropdownOpen(false);
    setSearchTerm("");
    window.dispatchEvent(new CustomEvent("projectChanged", { detail: project }));
  };

  const projectSettingsItems = [
    { icon: FaInfoCircle, label: "Project Details", path: "/project-details" },
    { icon: FaUsers, label: "Project Members", path: "/project-members" },
    { icon: FaList, label: "Requirement Types", path: "/requirement-type" },
    { icon: FaCog, label: "Test Case Types", path: "/testcases-type" },
    { icon: FaFlag, label: "Test Case Priorities", path: "/testcase-Priorities" },
  ];

  const menuItems = [
    { icon: FaFileAlt, label: "Test Cases", path: "/test-cases" },
    { icon: FaRegFileAlt, label: "Requirements", path: "/create-requirement" },
    { icon: FaClipboardList, label: "Test Suites", path: "/test-suites" },
    {
      icon: FaCog,
      label: "Project Settings",
      isExpandable: true,
      items: projectSettingsItems,
    },
  ];

  const handleMenuClick = (path) => {
    if (!selectedProject) {
      alert("Please select a project first");
      return;
    }
    navigate(path);
  };

  const filteredProjects = projects.filter((project) =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isVisible) return null;

  return (
    <div
      className={`fixed ${
        isL1Expanded ? "left-60" : "left-16"
      } h-[calc(100%-4rem)] w-60 bg-white border-l border-gray-200 transition-all duration-300 ease-in-out md:block`}
    >
      {/* Project Dropdown */}
      <div
        className="relative w-4/5 p-2 bg-white border border-purple-600 rounded-md flex justify-between items-center cursor-pointer mt-[18px] left-1/2 transform -translate-x-1/2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-black truncate">
          {selectedProject?.name || "Select Project"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transform transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
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
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className="p-2 cursor-pointer hover:bg-blue-100"
              >
                {project.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="overflow-y-none mt-4">
        <div className="flex justify-center text-lg text-gray-500 p-2">
          Test Development
        </div>

        {menuItems.map((item, index) => (
          <div key={index}>
            {item.isExpandable ? (
              <>
                <div
                  className={`sub-sidebar-item flex items-center gap-2 p-2 cursor-pointer ${
                    activeMenuItem === item.label ? "bg-[#9ac5e2] text-white" : "text-gray-700"
                  } hover:bg-blue-100`}
                  onClick={() => setIsProjectSettingsExpanded(!isProjectSettingsExpanded)}
                >
                  <item.icon className="icon" />
                  <span>{item.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 ml-auto transform transition-transform ${
                      isProjectSettingsExpanded ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {isProjectSettingsExpanded &&
                  item.items.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className={`flex items-center gap-2 pl-8 pr-2 py-1 cursor-pointer ${
                        activeMenuItem === subItem.label ? "bg-blue-100 text-blue-900" : "text-gray-700"
                      } hover:bg-blue-50`}
                      onClick={() => {
                        setActiveMenuItem(subItem.label);
                        handleMenuClick(subItem.path);
                      }}
                    >
                      <subItem.icon 
                        className="icon" 
                        style={{ color: activeMenuItem === subItem.label ? "#007bff" : "gray" }} 
                      />
                      <span>{subItem.label}</span>
                    </div>
                  ))}
              </>
            ) : (
              <div
                className={`sub-sidebar-item flex items-center gap-2 p-2 cursor-pointer ${
                  activeMenuItem === item.label ? "bg-[#9ac5e2] text-white" : "text-gray-700"
                } hover:bg-blue-100`}
                onClick={() => {
                  setActiveMenuItem(item.label);
                  handleMenuClick(item.path);
                }}
              >
                <item.icon className="icon" />
                <span>{item.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSidebar;