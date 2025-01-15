import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const TestSuites = () => {
  const navigate = useNavigate();
  const [testSuites, setTestSuites] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedProject = localStorage.getItem("selectedProject");
    if (savedProject) {
      const project = JSON.parse(savedProject);
      setSelectedProject(project);
    }

    const handleProjectChange = (event) => {
      const newProject = event.detail;
      setSelectedProject(newProject);
    };

    window.addEventListener("projectChanged", handleProjectChange);

    return () => window.removeEventListener("projectChanged", handleProjectChange);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setTestSuites([]);
      setLoading(true);

      const fetchTestSuites = async (projectId) => {
        try {
          const response = await fetch(
            `https://testerally-be-ylpr.onrender.com/api/testsuites/?project_id=${projectId}`
          );
          const data = await response.json();
          if (response.ok) {
            setTestSuites(data);
          } else {
            setTestSuites([]);
          }
        } catch (error) {
          console.error("Error fetching test suites:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTestSuites(selectedProject.id);
    }
  }, [selectedProject]);

  const filteredTestSuites = testSuites.filter((testSuite) =>
    testSuite.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 ml-[300px] transition-all duration-300 max-w-[calc(100%-300px)]">
        <div className="p-6">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
              <div className="flex space-x-4 mb-4 sm:mb-0">
                <button className="px-4 py-2 text-purple-600 font-medium border-b-2 border-purple-600">
                  Test Suites
                </button>
                <button className="px-4 py-2 text-gray-500 hover:text-purple-600">
                  Step Groups
                </button>
              </div>
              <button
                onClick={() => navigate("/test-suites/create-testsuite")}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <AiOutlinePlus className="mr-2" />
                Create
              </button>
            </div>

            <div className="p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <h2 className="text-lg font-medium text-gray-700">Test Suites</h2>
              <div className="relative w-full sm:w-64">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-4 text-center">Loading test suites...</div>
            ) : testSuites.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No test suites available</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTestSuites.map((testSuite) => (
                      <tr key={testSuite.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {testSuite.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {testSuite.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {selectedProject?.name}
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

export default TestSuites;
