import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";

const CreateProject = () => {
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

    if (projectType === "Select Type") {
      newErrors.projectType = "Please select a valid Project Type!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateProject = () => {
    if (!validateFields()) return;

    alert("Project Created Successfully");
  };

  const handleCancel = () => {
    navigate("/dashboard-user");
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="create-project-container">
      <div className="create-project-box">
        <h2 className="create-project-title animated-slide-in">Create Project</h2>

        <div className="create-project-input-group">
          <label className="create-project-label">
            Project Name<span className="create-project-required">*</span>
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, projectName: "" }));
            }}
            placeholder="Enter project name"
            className={`create-project-input ${
              errors.projectName ? "create-project-error-border" : ""
            }`}
          />
          {errors.projectName && (
            <span className="create-project-error">{errors.projectName}</span>
          )}
        </div>

        <div className="create-project-input-group">
          <label className="create-project-label">
            Description <span className="create-project-optional">(optional)</span>
          </label>

          <button onClick={toggleDescription} className="create-project-toggle-btn">
            {showDescription ? "Hide Description" : "Show Description"}
          </button>

          {showDescription && (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="create-project-textarea"
            />
          )}
        </div>

        <div className="create-project-input-group">
          <label className="create-project-label">
            Project Type<span className="create-project-required">*</span>
          </label>
          <select
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
          </select>
          {errors.projectType && (
            <span className="create-project-error">{errors.projectType}</span>
          )}
        </div>

        <div className="create-project-buttons">
          <button onClick={handleCancel} className="create-project-cancel-btn">
            Cancel
          </button>
          <button onClick={handleCreateProject} className="create-project-create-btn">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
