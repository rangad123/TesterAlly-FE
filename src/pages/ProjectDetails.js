import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, Edit2, Trash2, ChevronDown } from 'lucide-react';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [testCases, setTestCases] = useState([]);
  const [testSuites, setTestSuites] = useState([]);
  const userName = localStorage.getItem("userName") || "User Name";
  const userId = localStorage.getItem("userId");
  const projectTypes = ["Web Development", "Mobile Application", "API Development", "Data Analysis"];

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/projects/?user_id=${userId}`
        );
        const data = await response.json();

        console.log("Projects",data)

        if (response.ok) {
          setAllProjects(data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAllProjects();
    }
  }, [userId]);

  useEffect(() => {
    const savedProject = localStorage.getItem("selectedProject");
    if (savedProject) {
      const project = JSON.parse(savedProject);
      setSelectedProject(project);
      fetchTestCases(project.id);
      fetchTestSuites(project.id);
    }

    const handleProjectChange = (event) => {
      const newProject = event.detail;
      setSelectedProject(newProject);
      if (newProject) {
        fetchTestCases(newProject.id);
        fetchTestSuites(newProject.id);
      }
    };

    window.addEventListener("projectChanged", handleProjectChange);
    return () => window.removeEventListener("projectChanged", handleProjectChange);
  }, []);

  const fetchTestCases = async (projectId) => {
    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testcases/?project_id=${projectId}`
      );
      const data = await response.json();
      if (response.ok) {
        setTestCases(data);

        console.log("Test cases",data)
      }
    } catch (err) {
      console.error("Error fetching test cases:", err);
    }
  };

  const fetchTestSuites = async (projectId) => {
    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testsuites/?project_id=${projectId}`
      );
      const data = await response.json();
      if (response.ok) {
        setTestSuites(data);

        console.log("Test suites",data)
      }
    } catch (err) {
      console.error("Error fetching test suites:", err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
  
    try {
      if (!projectId || !userId) {
        alert(!projectId ? "Invalid project ID." : "Invalid user ID.");
        return;
      }
  
      const deleteResponse = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/projects/${projectId}/?user_id=${userId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (deleteResponse.ok) {
        
        const currentUser = localStorage.getItem("userId");
        localStorage.removeItem(`selectedProject_${currentUser}`);
        localStorage.removeItem("selectedProject"); 
  
        window.dispatchEvent(new CustomEvent("projectDeleted", { 
          detail: { projectId }
        }));
  
        alert("Project deleted successfully.");
        setSelectedProject(null);
        navigate("/dashboard-user");
      } else {
        const errorData = await deleteResponse.json();
        console.error("Delete failed:", errorData);
        alert(errorData.message || "Failed to delete project.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred while deleting the project. Please try again.");
    }
  };
  
  

  const handleEditClick = (project) => {
    if (selectedProject && project.id === selectedProject.id) {
      setSelectedProject({ ...selectedProject, isEditing: true });
    } else {
      const updatedProjects = allProjects.map((p) => ({
        ...p,
        isEditing: p.id === project.id
      }));
      setAllProjects(updatedProjects);
    }
  };

  const handleCancelEdit = (projectId) => {
    if (selectedProject && projectId === selectedProject.id) {
      setSelectedProject({ ...selectedProject, isEditing: false });
    } else {
      const updatedProjects = allProjects.map((project) => ({
        ...project,
        isEditing: false
      }));
      setAllProjects(updatedProjects);
    }
  };

  const handleSave = async (projectId, updatedData) => {
    try {

      if (!projectId || !userId) {
        alert(!projectId ? "Invalid project ID." : "Invalid user ID.");
        return;
      }
      
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/projects/${projectId}/?user_id=${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedProject = await response.json();
        if (selectedProject && projectId === selectedProject.id) {
          setSelectedProject({ ...updatedProject, isEditing: false });
          localStorage.setItem("selectedProject", JSON.stringify(updatedProject));
        } else {
          const updatedProjects = allProjects.map((project) =>
            project.id === projectId ? { ...updatedProject, isEditing: false } : project
          );
          setAllProjects(updatedProjects);
        }
        alert("Project updated successfully.");
      }
    } catch (err) {
      console.error("Error updating project:", err);
      alert("An error occurred while updating the project.");
    }
  };

  const handleChange = (projectId, field, value) => {
    if (selectedProject && projectId === selectedProject.id) {
      setSelectedProject({ ...selectedProject, [field]: value });
    } else {
      const updatedProjects = allProjects.map((project) => {
        if (project.id === projectId) {
          return { ...project, [field]: value };
        }
        return project;
      });
      setAllProjects(updatedProjects);
    }
  };

  const renderProjectRow = (project, isSelected = false) => {
    const isEditing = project.isEditing;
  
    return (
      <tr
        key={project.id} 
        className="group hover:bg-gray-50 transition-colors duration-200 border-b"
      >
        <td className="px-6 py-4 text-sm text-gray-900">
          {isEditing ? (
            <input
              type="text"
              value={project.name}
              onChange={(e) => handleChange(project.id, "name", e.target.value)}
              className="w-full p-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
            />
          ) : (
            <span className="font-medium">{project.name}</span>
          )}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {isEditing ? (
            <input
              type="text"
              value={project.description}
              onChange={(e) => handleChange(project.id, "description", e.target.value)}
              className="w-full p-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
            />
          ) : (
            project.description || "N/A"
          )}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {isEditing ? (
            <div className="relative">
              <select
                value={project.project_type}
                onChange={(e) => handleChange(project.id, "project_type", e.target.value)}
                className="w-full p-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 appearance-none transition-all duration-200 pr-8"
              >
                {projectTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          ) : (
            project.project_type || "N/A"
          )}
        </td>
        {isSelected && (
          <td className="px-6 py-4 text-sm text-gray-500">{userName}</td>
        )}
        <td className="px-6 py-4 text-sm font-medium">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSave(project.id, {
                  name: project.name,
                  description: project.description,
                  project_type: project.project_type,
                })}
                className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </button>
              <button
                onClick={() => handleCancelEdit(project.id)}
                className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 transition-opacity duration-200">
              <button
                onClick={() => handleEditClick(project)}
                className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Project Details</h2>

          {loading ? (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg mb-4">Loading projects...</p>
            </div>
          ) : !selectedProject ? (
            <div className="space-y-6">
              {allProjects.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                  <p className="text-gray-600 text-lg mb-4">You have no projects yet.</p>
                  <p className="text-gray-500">Please create a project to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allProjects.map((project) => renderProjectRow(project))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "details"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  Project Details
                </button>
                <button
                  onClick={() => setActiveTab("test-cases")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "test-cases"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  Test Cases
                </button>
                <button
                  onClick={() => setActiveTab("test-suites")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "test-suites"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  Test Suites
                </button>
              </div>

              {activeTab === "details" && (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {renderProjectRow(selectedProject, true)}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "test-cases" && (
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Test Cases</h3>
                    </div>
                    {testCases.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">No test cases available</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Test Case Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {testCases.map((testCase) => (
                              <tr key={testCase.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {testCase.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {testCase.url || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {testCase.status || "Not Started"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "test-suites" && (
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Test Suites</h3>
                    </div>
                    {testSuites.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">No test suites available</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Suite Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Test Cases Count
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {testSuites.map((suite) => (
                              <tr key={suite.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {suite.title}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {suite.description || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {suite.test_cases_count || 0}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;