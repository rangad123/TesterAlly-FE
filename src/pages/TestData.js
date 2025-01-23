import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTestCases.css";

const TestData = () => {
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({ url: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [createdUrl, setCreatedUrl] = useState(null);
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
    } else {
      navigate("/dashboard-user");
    }

    const handleProjectChange = (event) => {
      const newProject = event.detail;
      setSelectedProject(newProject);
    };

    window.addEventListener("projectChanged", handleProjectChange);
    return () => window.removeEventListener("projectChanged", handleProjectChange);
  }, [navigate]);

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    if (!url.trim()) {
      newErrors.url = "URL is required!";
      isValid = false;
    } else {
      try {
        new URL(url.startsWith("http") ? url : `https://${url}`);
      } catch (error) {
        newErrors.url = "Invalid URL format!";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateTestCase = async () => {
    if (!validateFields()) return;

    const finalUrl = url.startsWith("http") ? url : `https://${url}`;

    const payload = {
      project_id: selectedProject.id,
      url: finalUrl,
    };

    setIsLoading(true);
    try {
      const response = await fetch("https://testerally-be-ylpr.onrender.com/api/testcases/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setCreatedUrl(finalUrl);
        alert("Test Case Created Successfully");
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

  const handleCancel = () => {
    navigate("/dashboard-user");
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
                    <h2 className="create-test-cases-title">Test Cases URL</h2>
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
                    URL<span className="text-red-500">*</span>
                  </label>
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
                  {errors.url && (
                    <span className="text-red-500 text-sm mt-1">{errors.url}</span>
                  )}
                </div>

                {createdUrl && selectedProject && (
                  <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                    <p>
                      Created URL: <strong>{createdUrl}</strong>
                    </p>
                    <p>
                      Connected Project: <strong>{selectedProject.name}</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestData;
