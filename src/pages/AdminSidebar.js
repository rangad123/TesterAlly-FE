import React, { useState, useEffect } from "react";
import {
  MdDashboard,
  MdBusiness,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdPeople,
  MdClose,
  MdMenu,
} from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [organizations, setOrganizations] = useState([]);
  const [expandedOrganizations, setExpandedOrganizations] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeOrganization, setActiveOrganization] = useState(null);
  const [projectMembers, setProjectMembers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch(
          "https://testerally-be-ylpr.onrender.com/api/organizations/"
        );
        const data = await response.json();
        const initialExpandedState = data.reduce((acc, org) => {
          acc[org.id] = false;
          return acc;
        }, {});
        setOrganizations(data);
        setExpandedOrganizations(initialExpandedState);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleOrganizationExpand = async (organization) => {
    if (!organization.projects) {
      try {
        const response = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/organizations/${organization.id}/projects/`
        );
        const projects = await response.json();
        organization.projects = projects;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    setExpandedOrganizations((prev) => ({
      ...prev,
      [organization.id]: !prev[organization.id],
    }));
    setActiveOrganization(organization.id);
  };

  const handleProjectSelect = async (project, organization) => {
    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/projects/${project.id}/members/`
      );
      const members = await response.json();
      setSelectedProject(project);
      setProjectMembers(members);
      setActiveOrganization(organization.id);
      
      // Expand the organization if not already expanded
      setExpandedOrganizations((prev) => ({
        ...prev,
        [organization.id]: true,
      }));
    } catch (error) {
      console.error("Error fetching project members:", error);
      setProjectMembers([]);
    }
  };

  const renderNavItem = (icon, label, path, isActive) => (
    <div
      className={`nav-item ${isActive ? "active" : ""}`}
      onClick={() => navigate(path)}
    >
      {icon}
      {isSidebarOpen && <span className="nav-label">{label}</span>}
    </div>
  );

  return (
    <div className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <MdClose className="menu-icon" /> : <MdMenu className="menu-icon" />}
      </div>

      <nav className="sidebar-navigation">
        {renderNavItem(
          <MdDashboard className="nav-icon" />,
          "Dashboard",
          "/admin-dashboard",
          location.pathname === "/admin-dashboard"
        )}

        <div className="organizations-section">
          {isSidebarOpen && <div className="section-header">Organizations</div>}
          {organizations.map((organization) => (
            <div
              key={organization.id}
              className={`organization-item ${
                activeOrganization === organization.id ? "active" : ""
              }`}
            >
              <div
                className="organization-header"
                onClick={() => toggleOrganizationExpand(organization)}
              >
                {isSidebarOpen && (
                  <>
                    {expandedOrganizations[organization.id] ? (
                      <MdKeyboardArrowDown className="expand-icon" />
                    ) : (
                      <MdKeyboardArrowRight className="expand-icon" />
                    )}
                    <MdBusiness className="org-icon" />
                    <span className="org-name">{organization.name}</span>
                  </>
                )}
              </div>

              {expandedOrganizations[organization.id] &&
                organization.projects &&
                isSidebarOpen && (
                  <div className="projects-list">
                    {organization.projects.map((project) => (
                      <div
                        key={project.id}
                        className={`project-item ${
                          selectedProject?.id === project.id ? "selected" : ""
                        }`}
                        onClick={() => handleProjectSelect(project, organization)}
                      >
                        {project.name}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>

        {isSidebarOpen && selectedProject && projectMembers.length > 0 && (
          <div className="project-members-section">
            <div className="section-header">
              <MdPeople className="nav-icon" />
              {selectedProject.name} Members
            </div>
            <div className="members-list">
              {projectMembers.map((member) => (
                <div key={member.id} className="member-item">
                  {member.name}
                </div>
              ))}
            </div>
          </div>
        )}

      </nav>
    </div>
  );
};

export default AdminSidebar;