import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminOrganization.css';

const AdminOrganization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);  // Add a loading state to control the loading indicator
  const [error, setError] = useState(null);

  // Fetch Organizations from Backend API
  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get("https://testerally-be-ylpr.onrender.com/api/organizations/");
        setOrganizations(response.data);
        setLoading(false);  // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch organizations");
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Fetch projects for the selected organization
  useEffect(() => {
    if (selectedOrg) {
      setLoading(true); // Set loading to true while fetching project data
      setSelectedProject(null); // Clear previous selected project data
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`https://testerally-be-ylpr.onrender.com/api/organization/${selectedOrg.id}/projects/`);
          setProjects(response.data.projects); // Use the 'projects' from the response
          setLoading(false); // Set loading to false after fetching project data
        } catch (err) {
          setError("Failed to fetch projects");
          setLoading(false);
        }
      };

      fetchProjects();
    } else {
      setProjects([]); // Clear projects if no organization is selected
    }
  }, [selectedOrg]);

  const handleBackButtonClick = () => {
    if (selectedProject) {
      setSelectedProject(null); // Go back to projects if a project is selected
    } else if (selectedOrg) {
      setSelectedOrg(null); // Go back to organizations if an organization is selected
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Left Panel (Sidebar) */}
      <div className="dashboard-left-panel">
        <div className="metric-card">
          <h2 className="text-2xl font-bold mb-4 text-white">
            {selectedProject ? selectedProject.name : selectedOrg ? selectedOrg.name : "Organizations"}
          </h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : selectedProject ? (
          // Project List (Left Panel) Not Needed Now, as it's in the Right Panel
          <div>
            <button
              className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              onClick={handleBackButtonClick}
            >
              ← Back to Projects
            </button>
          </div>
        ) : selectedOrg ? (
          // Project List (Left Panel)
          <div>
            <button
              className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              onClick={handleBackButtonClick}
            >
              ← Back to Organizations
            </button>
            <ul>
              {projects.length === 0 ? (
                <p className="text-gray-500">No projects found.</p>
              ) : (
                projects.map((project) => (
                  <li
                    key={project.id}
                    className={`p-3 rounded-lg cursor-pointer text-white font-medium transition ${selectedProject?.id === project.id ? "bg-blue-700" : "hover:bg-blue-500"} metric-card2`}
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.name}
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : (
          // Organization List (Left Panel)
          <ul>
            {organizations.map((org) => (
              <li
                key={org.id}
                className={`p-3 rounded-lg cursor-pointer text-white font-medium transition ${selectedOrg?.id === org.id ? "bg-blue-700" : "hover:bg-blue-500"} metric-card2`}
                onClick={() => setSelectedOrg(org)}
              >
                {org.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Panel (Main Content) */}
      <div className="dashboard-right-panel">
        {loading ? (
          <p>Loading...</p>
        ) : selectedProject ? (
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">{selectedProject.name}</h1>
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">Project Details</h2>
            <p className="text-gray-500">Description: {selectedProject.description}</p>
            <h3 className="text-xl font-semibold mt-4 text-blue-600">Test Cases</h3>
            {selectedProject.test_cases && selectedProject.test_cases.length > 0 ? (
              <ul className="list-disc list-inside text-blue-500">
                {selectedProject.test_cases.map((testCase) => (
                  <li key={testCase.id}>
                    {testCase.name} - {testCase.testcase_type} - Priority: {testCase.testcase_priority}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No test case found.</p>
            )}
            <h3 className="text-xl font-semibold mt-4 text-blue-600">Project Members</h3>
            <ProjectMembers projectId={selectedProject.id} />
          </div>
        ) : selectedOrg ? (
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">{selectedOrg.name}</h1>
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">Projects</h2>
            {projects.length === 0 ? (
              <p className="text-gray-500">No projects found for this organization.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <h3 className="text-xl font-semibold text-blue-600">{project.name}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">Select an organization from the sidebar</p>
        )}
      </div>
    </div>
  );
};

const ProjectMembers = ({ projectId }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`https://testerally-be-ylpr.onrender.com/api/projects/${projectId}/members/`);
        setMembers(response.data);
      } catch (err) {
        console.error("Failed to fetch project members", err);
        setMembers([]);
      }
    };

    fetchMembers();
  }, [projectId]);

  return (
    <div className="mt-3">
      <h4 className="text-lg font-semibold text-blue-700">Project Members:</h4>
      {members.length === 0 ? (
        <p className="text-gray-500">No members assigned.</p>
      ) : (
        <ul className="list-disc list-inside text-blue-500">
          {members.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrganization;
