import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from 'lucide-react';

const ProjectList = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/projects/?user_id=${userId}`
        );
        const data = await response.json();

        console.log("Projects", data);

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
        alert("Project deleted successfully.");
        setAllProjects(allProjects.filter(project => project.id !== projectId));
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


  const renderProjectRow = (project) => {
    return (
      <tr
        key={project.id} 
        className="group hover:bg-gray-50 transition-colors duration-200 border-b"
      >
        <td className="px-6 py-4 text-sm text-gray-900">
          <span className="font-medium">{project.name}</span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {project.description || "N/A"}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {project.project_type || "N/A"}
        </td>
        <td className="px-6 py-4 text-sm font-medium">
          <div className="flex items-center space-x-2 transition-opacity duration-200">
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Projects List</h2>

          {loading ? (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg mb-4">Loading projects...</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
