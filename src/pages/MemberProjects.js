import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberSidebar from "./MemberSidebar";

const MemberProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [testSuites, setTestSuites] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const projectResponse = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/user-projects/${userId}/`
        );
        const projectData = await projectResponse.json();
        setProjects(projectData.projects || []);

        const testCaseResponse = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/user-projects/${userId}/`
        );
        const testCaseData = await testCaseResponse.json();
        setTestCases(testCaseData.test_cases || []);

        const testSuiteResponse = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/user-projects/${userId}/`
        );
        const testSuiteData = await testSuiteResponse.json();
        setTestSuites(testSuiteData.test_suites || []);

        const requirementResponse = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/user-projects/${userId}/`
        );
        const requirementData = await requirementResponse.json();
        setRequirements(requirementData.requirements || []);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleProjectClick = (project) => {
    const currentUser = localStorage.getItem("userId");

    const projectTestCases = testCases.filter(tc => tc.project_id === project.id);
    const projectTestSuites = testSuites.filter(ts => ts.project_id === project.id);
    const projectRequirements = requirements.filter(req => req.project_id === project.id);

    const projectData = {
      ...project,
      test_cases: projectTestCases,
      test_suites: projectTestSuites,
      requirements: projectRequirements,
    };

    // Save to localStorage
    localStorage.setItem(`selectedProject_${currentUser}`, JSON.stringify(projectData));
    localStorage.setItem("selectedProject", JSON.stringify(projectData));

    window.dispatchEvent(new CustomEvent("projectChanged", { detail: projectData }));
    window.dispatchEvent(new CustomEvent("showProjectSidebar", { detail: true }));

    navigate("/test-cases");
  };

  return (
    <div>
      <MemberSidebar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Projects
            </h2>

            {loading ? (
              <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-lg mb-4">Loading projects...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.length === 0 ? (
                  <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 text-lg mb-4">
                      You have no projects yet.
                    </p>
                    <p className="text-gray-500">
                      Please create a project to get started.
                    </p>
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
                            Statistics
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {projects.map((project) => {
                          const projectTestCases = testCases.filter(tc => tc.project_id === project.id);
                          const projectTestSuites = testSuites.filter(ts => ts.project_id === project.id);
                          const projectRequirements = requirements.filter(req => req.project_id === project.id);

                          return (
                            <tr
                              key={project.id}
                              className="group hover:bg-gray-50 transition-colors duration-200 border-b cursor-pointer"
                              onClick={() => handleProjectClick(project)}
                            >
                              <td className="px-6 py-4 text-sm text-gray-900">
                                <span className="font-medium">{project.name}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {project.description || "No description provided"}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {project.project_type || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                <div className="space-y-1">
                                  <p>Test Cases: {projectTestCases.length}</p>
                                  <p>Test Suites: {projectTestSuites.length}</p>
                                  <p>Requirements: {projectRequirements.length}</p>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProjects;
