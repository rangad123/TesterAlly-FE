import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";

const CreateProject = ({ onProjectCreated }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [errors, setErrors] = useState({ projectName: "", projectType: "" });

  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;
    const newErrors = { projectName: "", projectType: "" };

    if (!projectName.trim()) {
      newErrors.projectName = "Project Name is required!";
      isValid = false;
    }

    if (!projectType || projectType === "Select Type") {
      newErrors.projectType = "Please select a valid Project Type!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateProject = async () => {
    if (!validateFields()) return;
  
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
  
    const projectData = {
      user_id: parseInt(userId),
      name: projectName,
      description: description || "No description provided",
      project_type: projectType,
    };
  
    try {
      const response = await fetch(
        "https://testerally-be-ylpr.onrender.com/api/projects/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Backend Error Response:", errorResponse);
        throw new Error(errorResponse.message || "Failed to create project");
      }
  
      const createdProject = await response.json();

      localStorage.setItem(`selectedProject_${userId}`, JSON.stringify(createdProject));
  
      window.dispatchEvent(new CustomEvent("projectCreated", { detail: createdProject }));
  
      alert("Project Created Successfully");
  
      if (onProjectCreated) {
        onProjectCreated(createdProject.name);
      }
  
      setProjectName("");
      setDescription("");
      setProjectType("");
      setShowDescription(false);
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    }
  };
  
  

  const handleCancel = () => {
    navigate("/dashboard-user");
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">
    <div className="create-project-container">
      <div className="create-project-box">

        <div className="create-test-cases-header sm:block">
        <h2 className="create-test-cases-title" style={{ fontSize: '28px', fontWeight: 'bold' }}>Create Project</h2>
        
            <div className="create-test-cases-button-group-right">
              <button onClick={handleCancel} className="cancel-btn">
                  Cancel
              </button>
              <button onClick={handleCreateProject} className="create-btn">
                Create
              </button>
            </div>
          </div>

        <div className="create-project-input-group">
          <label htmlFor="projectName" className="create-project-label">
            Project Name<span className="create-project-required">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            autoComplete="off"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, projectName: "" }));
            }}
            placeholder="Enter your project name"
            className={`create-project-input ${
              errors.projectName ? "create-project-error-border" : ""
            }`}
          />
          {errors.projectName && (
            <span className="create-project-error">{errors.projectName}</span>
          )}
        </div>

        <div className="create-project-input-group">
          <label htmlFor="description" className="create-project-label">
            Description<span className="create-project-optional">(optional)</span>
          </label>
          <button
            onClick={toggleDescription}
            className="create-project-toggle-btn"
          >
            {showDescription ? "Hide Description" : "Add Description"}
          </button>
          {showDescription && (
            <textarea
              id="description"
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description"
              className="create-project-textarea"
            />
          )}
        </div>

        <div className="create-project-input-group">
          <label htmlFor="projectType" className="create-project-label">
            Project Type<span className="create-project-required">*</span>
          </label>
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => {
              setProjectType(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, projectType: "" }));
            }}
            className={`create-project-select ${
              errors.projectType ? "create-project-error-border" : ""
            }`}
          >
            <option value="" disabled hidden>
              Select Type
            </option>
            <option value="Web Application">Web Application</option>
            <option value="Mobile Application">Mobile Application</option>
            <option value="API Development">API Development</option>
            <option value="Data Analysis">Data Analysis</option>
          </select>
          {errors.projectType && (
            <span className="create-project-error">{errors.projectType}</span>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default CreateProject;
