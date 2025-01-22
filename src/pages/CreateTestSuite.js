import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTestSuite.css";

const CreateTestSuite = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preRequisite, setPreRequisite] = useState("");
  const [labels, setLabels] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Get current user's ID
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    // Get the selected project for this user
    const savedProjectKey = `selectedProject_${userId}`;
    const savedProject = localStorage.getItem(savedProjectKey);
    
    if (savedProject) {
      try {
        setSelectedProject(JSON.parse(savedProject));
      } catch (err) {
        console.error("Error parsing saved project:", err);
        localStorage.removeItem(savedProjectKey);
      }
    }

    const handleProjectChange = (event) => {
      const project = event.detail;
      setSelectedProject(project);
      localStorage.setItem(savedProjectKey, JSON.stringify(project));
    };

    window.addEventListener("projectChanged", handleProjectChange);

    return () => {
      window.removeEventListener("projectChanged", handleProjectChange);
    };
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title of the test suite is required.";
    }

    if (!selectedProject?.id) {
      newErrors.project = "A project must be selected to create a test suite.";
    }

    if (!labels.trim()) {
      newErrors.labels = "Labels are required.";
    }
    
    return newErrors;
  };

  const handleCreate = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch("https://testerally-be-ylpr.onrender.com/api/testsuites/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          pre_requisite: preRequisite,
          labels: labels.split(",").map((label) => label.trim()).filter(Boolean),
          project_id: selectedProject.id,
        }),
      });

      if (response.ok) {
        alert("Test Suite Created Successfully");
        setTitle("");
        setDescription("");
        setPreRequisite("");
        setLabels("");
        navigate("/test-suites");
      } else {
        const errorData = await response.json();
        alert(`Failed to create test suite: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/test-suites");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="lg:p-6 sm:p-0">
          <div className="create-test-suite-container">
            <div className="create-test-suite-content">
              <div className="create-test-cases-header">
                <div className="flex flex-col">
                  <h2 className="create-test-cases-title">Create Test Suite</h2>
                  {selectedProject ? (
                    <span className="project-name text-sm text-gray-600 mt-1">
                      Project: {selectedProject.name}
                    </span>
                  ) : (
                    <span className="text-sm text-red-500 mt-1">
                      No project selected
                    </span>
                  )}
                </div>

                <div className="create-test-cases-button-group-right">
                  <button onClick={handleCancel} className="cancel-btn">
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreate} 
                    className={`create-btn ${!selectedProject ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading || !selectedProject}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>

              {!selectedProject && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                  <p className="text-yellow-700">
                    Please select a project from the sidebar before creating a test suite.
                  </p>
                </div>
              )}

              <form className="create-test-suite-form">
                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Title of the Test Suite *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter test suite title"
                    className={`create-test-suite-input ${errors.title ? "error-border" : ""}`}
                    disabled={!selectedProject}
                  />
                  {errors.title && <p className="error-message">{errors.title}</p>}
                </div>

                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="create-test-suite-textarea"
                    disabled={!selectedProject}
                  ></textarea>
                </div>

                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Pre-Requisite</label>
                  <textarea
                    value={preRequisite}
                    onChange={(e) => setPreRequisite(e.target.value)}
                    placeholder="Enter pre-requisites"
                    className="create-test-suite-textarea"
                    disabled={!selectedProject}
                  ></textarea>
                </div>

                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Labels</label>
                  <input
                    type="text"
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                    placeholder="Enter labels (comma-separated)"
                    className="create-test-suite-input"
                    disabled={!selectedProject}
                  />
                  {errors.labels && <p className="error-message">{errors.labels}</p>}
                </div>

                {errors.project && <p className="error-message">{errors.project}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTestSuite;