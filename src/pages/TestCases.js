import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const TestCases = () => {
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const savedProjectKey = `selectedProject_${userId}`;
    const savedProject = localStorage.getItem(savedProjectKey);
    
    if (savedProject) {
      try {
        const project = JSON.parse(savedProject);
        setSelectedProject(project);
      } catch (err) {
        console.error("Error parsing saved project:", err);
        localStorage.removeItem(savedProjectKey);
      }
    }

    const handleProjectChange = (event) => {
      const newProject = event.detail;
      setSelectedProject(newProject);
    };

    window.addEventListener("projectChanged", handleProjectChange);
    return () => window.removeEventListener("projectChanged", handleProjectChange);
  }, []);


  useEffect(() => {
    const fetchTestCases = async () => {
      setLoading(true);
      setError(null);
      setTestCases([]);

      if (!selectedProject?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://testerally-be-ylpr.onrender.com/api/testcases/?project_id=${selectedProject.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(Array.isArray(errorData) ? errorData[0] : errorData.message || 'Failed to fetch test cases');
        }

        const data = await response.json();
        setTestCases(data.map(testCase => ({
          ...testCase,
          project_name: selectedProject.name
        })));
      } catch (error) {
        console.error("Error fetching test cases:", error);
        setError(error.message || "Failed to fetch test cases. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestCases();
  }, [selectedProject]);

  const filteredTestCases = testCases.filter((testCase) =>
    testCase.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 ml-[300px] transition-all duration-300 max-w-[calc(100%-300px)]">
        <div className="p-6">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
              <div className="flex space-x-4 mb-4 sm:mb-0">
                <button className="px-4 py-2 text-purple-600 font-medium border-b-2 border-purple-600">
                  Test Cases
                </button>
                <button className="px-4 py-2 text-gray-500 hover:text-purple-600">
                  Step Groups
                </button>
              </div>
              <button
                onClick={() => navigate("/test-cases/create-testcases")}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                disabled={!selectedProject}
              >
                <AiOutlinePlus className="mr-2" />
                Create
              </button>
            </div>

            <div className="p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <h2 className="text-lg font-medium text-gray-700">
                {selectedProject ? `Test Cases - ${selectedProject.name}` : 'Select a Project'}
              </h2>
              {selectedProject && (
                <div className="relative w-full sm:w-64">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search test cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-4 text-center">Loading test cases...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : !selectedProject ? (
              <div className="p-4 text-center text-gray-500">
                Please select a project from the sidebar to view test cases
              </div>
            ) : filteredTestCases.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No test cases found for this project
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTestCases.map((testCase) => (
                      <tr key={testCase.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {testCase.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a
                            href={testCase.url}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {testCase.url}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {testCase.project_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCases;