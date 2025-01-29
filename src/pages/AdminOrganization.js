import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminOrganization.css'

const AdminOrganization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Organizations from Backend API
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get("https://testerally-be-ylpr.onrender.com/api/organizations/");
        setOrganizations(response.data);
        setLoading(false);
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
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`https://testerally-be-ylpr.onrender.com/api/organizations/${selectedOrg.id}/projects/`);
          setProjects(response.data);
        } catch (err) {
          console.error("Failed to fetch projects", err);
          setProjects([]);
        }
      };

      fetchProjects();
    }
  }, [selectedOrg]);

  return (
    <div className="admin-dashboard-container">
      {/* Left Panel (Sidebar) */}
      <div className="dashboard-left-panel">
        <div className="metric-card">
        <h2 className="text-2xl font-bold mb-4 text-white">Organizations</h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500 ">{error}</p>
        ) : (
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
        {selectedOrg ? (
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">{selectedOrg.name}</h1>

            {/* Display Projects in Grid (4 per row) */}
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">Projects</h2>
            {projects.length === 0 ? (
              <p className="text-gray-500">No projects found for this organization.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all hover:shadow-lg hover:scale-105"
                  >
                    <h3 className="text-xl font-semibold text-blue-600">{project.name}</h3>

                    {/* Fetch and display project members */}
                    <ProjectMembers projectId={project.id} />
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

// Fetch and Display Project Members
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
