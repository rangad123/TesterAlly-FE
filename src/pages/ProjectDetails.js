import React, { useEffect, useState } from "react";

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", description: "", type: "" });

  const userName = localStorage.getItem("userName") || "User Name";

  const fetchProjects = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("No userId found in localStorage");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/projects/?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch project details.");
      }
    } catch (err) {
      setError("An error occurred while fetching project data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/projects/${projectId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
        alert("Project deleted successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to delete project.");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setEditFormData({
      name: project.name,
      description: project.description,
      type: project.type || "",
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
        alert("Project updated successfully.");
        fetchProjects();
        setEditingProject(null);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update project.");
      }
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 ml-[300px] transition-all duration-300 max-w-[calc(100%-300px)]">
        <div className="p-6">
          <h2 className="create-test-cases-title mb-6 text-2xl font-semibold text-gray-800">
            Project Details
          </h2>

          {loading ? (
            <div className="text-center text-blue-600">Loading projects...</div>
          ) : error ? (
            <div className="text-red-600 text-center">{error}</div>
          ) : projects.length > 0 ? (
            <div className="overflow-auto rounded-lg shadow-md">
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
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6">{project.name}</td>
                      <td className="py-3 px-6">{project.description || "N/A"}</td>
                      <td className="py-3 px-6">{project.type || "N/A"}</td>
                      <td className="py-3 px-6">{userName || "N/A"}</td>
                      <td className="py-3 px-6 flex gap-2">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleEditClick(project)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-600 text-center">No projects available.</div>
          )}

          {/* Edit Form */}
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
                    value={editFormData.type}
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
