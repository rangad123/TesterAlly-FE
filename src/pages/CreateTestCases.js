import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTestCases.css";

const CreateTestCases = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [testCaseType, setTestCaseType] = useState("");
  const [testCasePriority, setTestCasePriority] = useState("");
  const [previousUrls, setPreviousUrls] = useState([]);
  const [selectedUrlOption, setSelectedUrlOption] = useState("new");
  const [errors, setErrors] = useState({ name: "", url: "", type: "", priority: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownLoading, setIsDropdownLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/dashboard/login");
      return;
    }
    const savedProjectKey = `selectedProject_${userId}`;
    const savedProject = localStorage.getItem(savedProjectKey);

    if (savedProject) {
      setSelectedProject(JSON.parse(savedProject));
      fetchPreviousUrls(JSON.parse(savedProject).id);
    } else {
      navigate("/dashboard-user");
    }

    const handleProjectChange = (event) => {
      const newProject = event.detail;
      setSelectedProject(newProject);
      fetchPreviousUrls(newProject.id);
    };

    window.addEventListener("projectChanged", handleProjectChange);
    return () => window.removeEventListener("projectChanged", handleProjectChange);
  }, [navigate]);

  const fetchPreviousUrls = async (projectId) => {
    setIsDropdownLoading(true);
    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testcases/?project_id=${projectId}`
      );
      if (response.ok) {
        const data = await response.json();

        const uniqueUrls = [...new Set(data.map((testCase) => testCase.url))].sort();
        setPreviousUrls(uniqueUrls);
      }
    } catch (error) {
      console.error("Error fetching previous URLs:", error);
    } finally {
      setIsDropdownLoading(false);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Test Case Name is required!";
      isValid = false;
    }

    if (selectedUrlOption === "new" && !url.trim()) {
      newErrors.url = "URL is required!";
      isValid = false;
    } else if (selectedUrlOption === "new") {
      try {
        new URL(url.startsWith("http") ? url : `https://${url}`);
      } catch (error) {
        newErrors.url = "Invalid URL format!";
        isValid = false;
      }
    }

    if (!testCaseType.trim()) {
      newErrors.type = "Test Case Type is required!";
      isValid = false;
    }

    if (!testCasePriority.trim()) {
      newErrors.priority = "Test Case Priority is required!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateTestCase = async () => {
    if (!validateFields()) return;

    const finalUrl = selectedUrlOption === "new" 
      ? (url.startsWith("http") ? url : `https://${url}`)
      : selectedUrlOption;

    const payload = {
      project_id: selectedProject.id,
      name,
      url: finalUrl,
      type: testCaseType,
      priority: testCasePriority,
    };

    setIsLoading(true);
    try {
      const response = await fetch("https://testerally-be-ylpr.onrender.com/api/testcases/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Test Case Created Successfully");
        navigate("/test-cases");
      } else {
        const errorData = await response.json();
        alert(`Failed to create test case: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestSuite = () => {
    navigate("/test-suites");
  };

  const handleWriteTestManually = () => {
    navigate("/write-manually");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="lg:p-6 sm:p-0">
          <div className="create-test-cases-page-container">
            <div className="create-test-cases-wrapper">
              <div className="create-test-cases-container">
                <div className="create-test-cases-header">
                  <div className="flex flex-col">
                    <h2 className="create-test-cases-title">Create Test Cases</h2>
                    {selectedProject && (
                      <span className="project-name text-sm text-gray-600 mt-1">
                        Project: {selectedProject.name}
                      </span>
                    )}
                  </div>
                  <div className="create-test-cases-button-group-right">
                    <button onClick={handleCancel} className="cancel-btn">
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateTestCase}
                      className="create-btn"
                      disabled={isLoading || !selectedProject}
                    >
                      {isLoading ? "Creating..." : "Create"}
                    </button>
                  </div>
                </div>

                <div className="create-test-cases-input-container">
                  <label className="block text-sm font-medium mb-2">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    placeholder="Enter test case name"
                    className={`create-project-input ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    disabled={!selectedProject}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1">{errors.name}</span>
                  )}
                </div>

                <div className="create-test-cases-input-container">
                  <label className="block text-sm font-medium mb-2">
                    URL<span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    <select
                      value={selectedUrlOption}
                      onChange={(e) => {
                        setSelectedUrlOption(e.target.value);
                        setErrors((prev) => ({ ...prev, url: "" }));
                      }}
                      className="create-project-input"
                      disabled={isDropdownLoading}
                    >
                      <option value="new">Enter New URL</option>
                      {previousUrls.length > 0 && (
                        <optgroup label="Previously Used URLs" className="p-group">
                          {previousUrls.map((prevUrl, index) => (
                            <option key={index} value={prevUrl}>
                              {prevUrl}
                            </option>
                          ))}
                        </optgroup>
                      )}
                      </select>
                      {selectedUrlOption === "new" && (
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => {
                            setUrl(e.target.value);
                            setErrors((prev) => ({ ...prev, url: "" }));
                          }}
                          placeholder="Enter URL"
                          className={`create-project-input ${
                            errors.url ? "border-red-500" : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          disabled={!selectedProject}
                        />
                      )}
                      {errors.url && (
                        <span className="text-red-500 text-sm mt-1">{errors.url}</span>
                      )}
                    </div>
                  </div>
  
                  <div className="create-test-cases-input-container">
                    <label className="block text-sm font-medium mb-2">
                      Test Case Type<span className="text-red-500">*</span>
                    </label>
                    <select
                      value={testCaseType}
                      onChange={(e) => {
                        setTestCaseType(e.target.value);
                        setErrors((prev) => ({ ...prev, type: "" }));
                      }}
                      className={`create-project-input ${
                        errors.type ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      disabled={!selectedProject}
                    >
                      <option value="">Select Type</option>
                      <option value="Functional">Functional</option>
                      <option value="Non-Functional">Non-Functional</option>
                      <option value="Regression">Regression</option>
                      <option value="Performance">Performance</option>
                      <option value="Security">Security</option>
                    </select>
                    {errors.type && (
                      <span className="text-red-500 text-sm mt-1">{errors.type}</span>
                    )}
                  </div>
  
                  <div className="create-test-cases-input-container">
                    <label className="block text-sm font-medium mb-2">
                      Test Case Priority<span className="text-red-500">*</span>
                    </label>
                    <select
                      value={testCasePriority}
                      onChange={(e) => {
                        setTestCasePriority(e.target.value);
                        setErrors((prev) => ({ ...prev, priority: "" }));
                      }}
                      className={`create-project-input ${
                        errors.priority ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      disabled={!selectedProject}
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    {errors.priority && (
                      <span className="text-red-500 text-sm mt-1">{errors.priority}</span>
                    )}
                  </div>
  
                  <div className="create-test-cases-button-group">
                    <button onClick={handleWriteTestManually} className="create-test-cases-btn-manual">
                      Write Test Manually
                    </button>

                    <button onClick={handleTestSuite} className="create-test-cases-test-suite-btn">
                      Test Suite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateTestCases;
  
