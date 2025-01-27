import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTestCases.css";

const TestData = () => {
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({ url: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);
  const navigate = useNavigate();


  const fetchTestData = async (projectId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testdata/${projectId}/`
      );
      if (response.ok) {
        const data = await response.json();
        setUploadedData(data);
      } else {
        
        setUploadedData(null);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
      setUploadedData(null);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/dashboard/login");
      return;
    }

    const savedProjectKey = `selectedProject_${userId}`;
    const savedProject = localStorage.getItem(savedProjectKey);

    if (savedProject) {
      const parsedProject = JSON.parse(savedProject);
      setSelectedProject(parsedProject);
      fetchTestData(parsedProject.id); 
    }

    const handleProjectChange = (event) => {
      const newProject = event.detail;
      setSelectedProject(newProject);
      setUrl(""); 
      setErrors({ url: "" }); 
      if (newProject?.id) {
        fetchTestData(newProject.id);
      } else {
        setUploadedData(null); 
      }
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
  
    if (!selectedProject?.id) {
      alert("Selected project is invalid. Please select a valid project.");
      return;
    }
  
    const payload = { url: finalUrl };
  
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testdata/${selectedProject.id}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        setUploadedData(data);
        alert("Test Data Uploaded Successfully");
      } else {
        alert(`Failed to upload test data: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during POST request:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setUrl(uploadedData.url);
    setUploadedData(null);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testdata/${selectedProject.id}/`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUploadedData(null);
        setUrl("");
        alert("Test Data Deleted Successfully");
      } else {
        const errorData = await response.json();
        alert(`Failed to delete test data: ${errorData.message || "Unknown error"}`);
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
                    <h2 className="create-test-cases-title">Test Data</h2>
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
                  </div>
                </div>
                      
                {uploadedData ? (
                  <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                    <p>
                      Uploaded URL: <strong>{uploadedData.url}</strong>
                    </p>
                    <div className="mt-2 flex space-x-4">
                      <button onClick={handleEdit} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={handleDelete} className="delete-btn" disabled={isLoading}>
                        {isLoading ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ) : (
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

                    <div className="mt-4">
                      <button
                        onClick={handleCreateTestCase}
                        className="create-btn"
                        disabled={isLoading || !selectedProject}
                      >
                        {isLoading ? "Uploading..." : "Upload"}
                      </button>
                    </div>
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