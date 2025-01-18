import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "./CreateTestCases.css";

const CreateTestCases = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({ name: "", url: "" });
  const [isLoading, setIsLoading] = useState(false);
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

    if (!name.trim()) {
      newErrors.name = "Test Case Name is required!";
      isValid = false;
    }

    if (!url.trim()) {
      newErrors.url = "URL is required!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateTestCase = async () => {
    if (!validateFields()) return;

    if (!selectedProject?.id) {
      navigate("/projects");
      return;
    }

    const payload = {
      project_id: selectedProject.id,
      name,
      url,
    };

    setIsLoading(true);

    try {
      const response = await fetch("https://testerally-be-ylpr.onrender.com/api/testcases/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Test Case Created Successfully");
        setName("");
        setUrl("");
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

  const handleCancel = () => navigate("/test-cases");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 ml-[300px] transition-all duration-300 max-w-[calc(100%-300px)]">
        <div className="p-6">
          <div className="create-test-cases-page-container">
            <div className="create-test-cases-wrapper">
              <div className="create-test-cases-container animated-fade-in">
                <div className="create-test-cases-header">
                  <div className="flex flex-col">
                    <h2 className="create-test-cases-title">Create Test Cases</h2>
                    {selectedProject && (
                      <span className="text-sm text-gray-600">
                        Project: {selectedProject.name}
                      </span>
                    )}
                  </div>
                  <div className="create-test-cases-button-group-right">
                    <button onClick={handleCancel} className="cancel-btn">
                      <AiOutlineClose className="inline-icon" />
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

                {!selectedProject && (
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                    <p className="text-yellow-700">
                      Please select a project from the sidebar before creating a test case.
                    </p>
                  </div>
                )}

                <div className="create-test-cases-input-container">
                  <label className="create-test-cases-label">
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
                    }}
                    placeholder="Enter test case name"
                    className={`create-test-cases-input ${errors.name ? "error-border" : ""}`}
                    disabled={!selectedProject}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="create-test-cases-input-container">
                  <label className="create-test-cases-label">
                    URL<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, url: "" }));
                    }}
                    placeholder="Enter URL"
                    className={`create-test-cases-input ${errors.url ? "error-border" : ""}`}
                    disabled={!selectedProject}
                  />
                  {errors.url && <span className="error-message">{errors.url}</span>}
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