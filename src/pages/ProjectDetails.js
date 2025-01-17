import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]); 
  const [editingProject, setEditingProject] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", description: "", type: "" });
  const [testCases, setTestCases] = useState([]);
  const [testSuites, setTestSuites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const userName = localStorage.getItem("userName") || "User Name";
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/projects/?user_id=${userId}`
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Fetched data:", data);
          setAllProjects(data); 
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }finally {
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
      setEditFormData({
        name: project.name || "",
        description: project.description || "",
        type: project.type || "",
      });
      fetchTestCases(project.id);
      fetchTestSuites(project.id);
    }

    const handleProjectChange = (event) => {
      const newProject = event.detail;
      setSelectedProject(newProject);
      if (newProject) {
        setEditFormData({
          name: newProject.name || "",
          description: newProject.description || "",
          type: newProject.type || "",
        });
        fetchTestCases(newProject.id);
        fetchTestSuites(newProject.id);
      }
      setEditingProject(null);
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
      }
    } catch (err) {
      console.error("Error fetching test suites:", err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project? This will also delete all related test cases and test suites.")) return;

    try {
      const testCaseDeleteResponse = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testcases/?project_id=${projectId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      
      const testSuiteDeleteResponse = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testsuites/?project_id=${projectId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (testCaseDeleteResponse.ok && testSuiteDeleteResponse.ok) {
        const response = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/projects/${projectId}/`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          localStorage.removeItem("selectedProject");
          const projectsResponse = await fetch(
            `https://testerally-be-ylpr.onrender.com/api/projects/?user_id=${userId}`
          );
          const projectsData = await projectsResponse.json();
          if (projectsResponse.ok) {
            setAllProjects(projectsData);
          }
          navigate("/");
          window.dispatchEvent(new CustomEvent("projectChanged", { detail: null }));
          alert("Project and related test cases and test suites deleted successfully.");
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to delete project.");
        }
      } else {
        alert("Failed to delete related test cases or test suites.");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("An error occurred while deleting the project.");
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setEditFormData({
      name: project.name || "",
      description: project.description || "",
      type: project.project_type || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/projects/${editingProject.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (response.ok) {
        const updatedProject = await response.json();
        setSelectedProject(updatedProject);
        localStorage.setItem("selectedProject", JSON.stringify(updatedProject));
        window.dispatchEvent(new CustomEvent("projectChanged", { detail: updatedProject }));
        setEditingProject(null);
        alert("Project updated successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update project.");
      }
    } catch (err) {
      console.error("Error updating project:", err);
      alert("An error occurred while updating the project.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 ml-[300px] transition-all duration-300 max-w-[calc(100%-300px)]">
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
          {allProjects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {project.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.description || "No description available"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.project_type || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleEditClick(project)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
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
                <div className="overflow-auto rounded-lg shadow-md mb-6">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 text-left text-sm leading-normal">
                        <th className="py-3 px-6">Project Name</th>
                        <th className="py-3 px-6">Description</th>
                        <th className="py-3 px-6">Project Type</th>
                        <th className="py-3 px-6">Created By</th>
                        <th className="py-3 px-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                      <tr className="border-b hover:bg-gray-100">
                        <td className="py-3 px-6">{selectedProject.name}</td>
                        <td className="py-3 px-6">{selectedProject.description || "N/A"}</td>
                        <td className="py-3 px-6">{selectedProject.project_type || "N/A"}</td>
                        <td className="py-3 px-6">{userName}</td>
                        <td className="py-3 px-6 flex gap-2">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => handleEditClick(selectedProject)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDeleteProject(selectedProject.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "test-cases" && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium">Test Cases</h3>
                  {testCases.length === 0 ? (
                    <p>No test cases available</p>
                  ) : (
                    <ul>
                      {testCases.map((testCase) => (
                        <li key={testCase.id} className="py-2">
                          {testCase.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === "test-suites" && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium">Test Suites</h3>
                  {testSuites.length === 0 ? (
                    <p>No test suites available</p>
                  ) : (
                    <ul>
                      {testSuites.map((testSuite) => (
                        <li key={testSuite.id} className="py-2">
                          {testSuite.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {editingProject && (
            <div className="mt-8 bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-4">Edit Project</h3>
              <form onSubmit={handleEditSubmit}>
                <label className="block mb-2">
                  Project Name:
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="block w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="block w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Project Type:
                  <input
                    type="text"
                    name="type"
                    value={editFormData.project_type}
                    onChange={handleEditChange}
                    className="block w-full p-2 border rounded mt-1"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="bg-gray-400 text-white py-2 px-4 rounded mt-4 ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;