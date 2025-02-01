import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaList,
  FaCog,
  FaFlag,
  FaFileAlt,
  FaRegFileAlt,
  FaClipboardList,
} from "react-icons/fa";

const MemberSubBar = ({ isL1Expanded, isVisible, isMobileView, onOptionSelect }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [isProjectSettingsExpanded, setIsProjectSettingsExpanded] = useState(false);


  const fetchProjects = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("No userId found in localStorage");
      return;
    }
  
    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/user-projects/${userId}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();

        const projectsArray = data.projects || [];
        setProjects(projectsArray);
  
        const savedProjectKey = `selectedProject_${userId}`;
        const savedProject = localStorage.getItem(savedProjectKey);
  
        if (projectsArray.length > 0) {
          if (savedProject) {
            const parsedProject = JSON.parse(savedProject);
            const projectExists = projectsArray.some((p) => p.id === parsedProject.id);
  
            if (projectExists) {
              setSelectedProject(parsedProject);
            } else {
              setSelectedProject(projectsArray[0]);
              localStorage.setItem(savedProjectKey, JSON.stringify(projectsArray[0]));
            }
          } else {
            setSelectedProject(projectsArray[0]);
            localStorage.setItem(savedProjectKey, JSON.stringify(projectsArray[0]));
          }
        } else {
          setSelectedProject(null);
          localStorage.removeItem(savedProjectKey);
        }
      } else {
        console.error("Failed to fetch projects:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  
  const filteredProjects = Array.isArray(projects) 
    ? projects.filter((project) =>
        project.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  
  
  
useEffect(() => {
    fetchProjects();
  }, []); 

  useEffect(() => {
  
    const handleProjectCreated = (event) => {
      const newProject = event.detail;
      fetchProjects(); 
      setProjects((prevProjects) => [...prevProjects, newProject]);
      setSelectedProject(newProject);
      localStorage.setItem(`selectedProject_${newProject.user_id}`, JSON.stringify(newProject));
    };
  
    const handleProjectDeleted = (event) => {
      const { projectId } = event.detail;
      fetchProjects(); 
      setProjects((prevProjects) => {
        const updatedProjects = prevProjects.filter((project) => project.id !== projectId);

        if (selectedProject && selectedProject.id === projectId) {
          setSelectedProject(null);
          const userId = localStorage.getItem("userId");
          if (userId) {
            localStorage.removeItem(`selectedProject_${userId}`);
          }
          
          if (updatedProjects.length > 0) {
            setSelectedProject(updatedProjects[0]);
            localStorage.setItem(
              `selectedProject_${userId}`, 
              JSON.stringify(updatedProjects[0])
            );
          }
        }
        
        return updatedProjects;
      });
    };
  
    const handleProjectChanged = (event) => {
      const changedProject = event.detail;
      fetchProjects(); 
      if (changedProject) {
        setSelectedProject(changedProject);
        const userId = localStorage.getItem("userId");
        if (userId) {
          localStorage.setItem(`selectedProject_${userId}`, JSON.stringify(changedProject));
        }
      }
    };
  
    window.addEventListener("projectCreated", handleProjectCreated);
    window.addEventListener("projectDeleted", handleProjectDeleted);
    window.addEventListener("projectChanged", handleProjectChanged);
  
    return () => {
      window.removeEventListener("projectCreated", handleProjectCreated);
      window.removeEventListener("projectDeleted", handleProjectDeleted);
      window.removeEventListener("projectChanged", handleProjectChanged);
    };
  }, [selectedProject]); 
  
  

  const handleProjectSelect = (project) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    setSelectedProject(project);
    localStorage.setItem(`selectedProject_${userId}`, JSON.stringify(project));
    setIsDropdownOpen(false);
    setSearchTerm("");
    
    if (isMobileView && typeof onOptionSelect === "function") {
      onOptionSelect(); 
  }
  
    window.dispatchEvent(new CustomEvent("projectChanged", { detail: project }));
  };


  const projectSettingsItems = [
    { icon: FaInfoCircle, label: "Project Details", path:'/member-project-details' },
    { icon: FaFileAlt, label: "Test Data",  },
    { icon: FaList, label: "Requirement Types",  },
    { icon: FaCog, label: "Test Case Types", },
    { icon: FaFlag, label: "Test Case Priorities", },
  ];

  const menuItems = [
    { icon: FaFileAlt, label: "Test Cases", path:'/member-test-details' },
    { icon: FaRegFileAlt, label: "Requirements",  },
    { icon: FaClipboardList, label: "Test Suites", },
    {
      icon: FaCog,
      label: "Project Settings",
      isExpandable: true,
      items: projectSettingsItems,
    },
  ];

  const handleMenuClick = (path) => {
    if (!selectedProject) {
      alert("Please select a project first to access this feature.");
      return;
    }
  
    navigate(path);

    if (isMobileView) {
      onOptionSelect(); 
    }
  };
  

  if (!isVisible) return null;

  return (
    <div
      className={`fixed ${
        isL1Expanded ? "left-60" : "left-16"
      } h-[calc(100%-4rem)] w-60 bg-white border-l border-gray-200 transition-all duration-300 ease-in-out ${
        isMobileView ? 'md:hidden' : 'md:block'
      }`}
    >
      {/* Project Dropdown or No Projects Message */}
      <div className="px-4 mt-[18px]">
          <div
            className="relative w-full p-2 bg-white border border-purple-600 rounded-md flex justify-between items-center cursor-pointer"
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
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && Array.isArray(projects) && projects.length > 0 && (
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

      {/* Menu Items - Always visible */}
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
                    !selectedProject ? "text-gray-400" : activeMenuItem === item.label ? "bg-[#9ac5e2] text-white" : "text-gray-700"
                  } hover:bg-blue-100`}
                  onClick={() => selectedProject && setIsProjectSettingsExpanded(!isProjectSettingsExpanded)}
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
                        !selectedProject ? "text-gray-400" : activeMenuItem === subItem.label ? "bg-blue-100 text-blue-900" : "text-gray-700"
                      } hover:bg-blue-50`}
                      onClick={() => {
                        if (selectedProject) {
                          setActiveMenuItem(subItem.label);
                          handleMenuClick(subItem.path);
                        } else {
                          handleMenuClick(subItem.path);
                        }
                      }}
                    >
                      <subItem.icon 
                        className="icon" 
                        style={{ color: !selectedProject ? "#9CA3AF" : activeMenuItem === subItem.label ? "#007bff" : "gray" }} 
                      />
                      <span>{subItem.label}</span>
                    </div>
                  ))}
              </>
            ) : (
              <div
                className={`sub-sidebar-item flex items-center gap-2 p-2 cursor-pointer ${
                  !selectedProject ? "text-gray-400" : activeMenuItem === item.label ? "bg-[#9ac5e2] text-white" : "text-gray-700"
                } hover:bg-blue-100`}
                onClick={() => {
                  if (selectedProject) {
                    setActiveMenuItem(item.label);
                    handleMenuClick(item.path);
                  } else {
                    handleMenuClick(item.path);
                  }
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

export default MemberSubBar;