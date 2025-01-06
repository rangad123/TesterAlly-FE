import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
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

    if (!projectType || projectType === "Select Type") {
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
        <h2 className="create-project-title">Create Project</h2>

        <div className="create-project-input-group">
          <label htmlFor="projectName" className="create-project-label">
            Project Name<span className="create-project-required">*</span>
          </label>
          <input
            id="projectName"
            type="text"
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

        <div className="create-project-buttons">
          <button
            onClick={handleCancel}
            className="create-project-cancel-btn"
          >
            <AiOutlineClose /> Cancel
          </button>
          <button
            onClick={handleCreateProject}
            className="create-project-create-btn"
          >
            <AiOutlinePlus /> Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
