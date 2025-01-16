import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTestSuite.css";
import { AiOutlineClose } from "react-icons/ai";

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
    const savedProject = localStorage.getItem("selectedProject");
    if (savedProject) {
      setSelectedProject(JSON.parse(savedProject));
    }

    const handleProjectChange = (event) => {
      const project = event.detail;
      setSelectedProject(project);
    };

    window.addEventListener("projectChanged", handleProjectChange);

    return () => {
      window.removeEventListener("projectChanged", handleProjectChange);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title of the test suite is required.";
    }
    if (!selectedProject) {
      newErrors.project = "A project must be selected to create a test suite.";
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
          labels: labels.split(",").map((label) => label.trim()), // Convert to array
          project_id: selectedProject?.id,
        }),
      });
  
      console.log("Request Payload:", {
        title,
        description,
        pre_requisite: preRequisite,
        labels: labels.split(",").map((label) => label.trim()),
        project_id: selectedProject?.id,
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
      <div className="flex-1 ml-[300px] transition-all duration-300 max-w-[calc(100%-300px)]">
        <div className="p-6">
          <div className="create-test-suite-container">
            <div className="create-test-suite-content">
              <div className="create-test-cases-header">
                <h2 className="create-test-cases-title">Create Test Suite</h2>

                <div className="create-test-cases-button-group-right">
                  <button onClick={handleCancel} className="cancel-btn">
                    <AiOutlineClose className="inline-icon" />
                    Cancel
                  </button>
                  <button onClick={handleCreate} className="create-btn" disabled={isLoading}>
                    {isLoading ? "Creating..." : <> Create</>}
                  </button>
                </div>
              </div>

              <form className="create-test-suite-form">
                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Title of the Test Suite *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter test suite title"
                    className={`create-test-suite-input ${errors.title ? "error-border" : ""}`}
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
                  ></textarea>
                </div>
                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Pre-Requisite</label>
                  <textarea
                    value={preRequisite}
                    onChange={(e) => setPreRequisite(e.target.value)}
                    placeholder="Enter pre-requisites"
                    className="create-test-suite-textarea"
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
                  />
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
