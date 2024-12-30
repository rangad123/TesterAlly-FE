import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./CreateProject.css";

const CreateProject = ( ) => {
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
    <div className="page-container">
      <div className="create-project-container">
      <h2 className="animated-title">Create Project</h2>

      <div className="input-container">
        <label>
          Project Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, projectName: "" }));
          }}
          placeholder="Enter project name"
          className={errors.projectName ? "error-border" : ""}
        />
        {errors.projectName && (
          <span className="error-message">{errors.projectName}</span>
        )}
      </div>

      <div className="input-container">
        <label>
          Description <span style={{ color: "lightcoral" }}>(optional)</span>
        </label>

        <button onClick={toggleDescription} className="toggle-btn">
          {showDescription ? "Hide Description" : "Show Description"}
        </button>

        {showDescription && (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        )}
      </div>

      <div className="input-container">
        <label>
          Project Type<span style={{ color: "red" }}>*</span>
        </label>
        <select
          value={projectType}
          onChange={(e) => {
            setProjectType(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, projectType: "" }));
          }}
          className={errors.projectType ? "error-border" : ""}
        >
          <option value="" disabled hidden>
            Select Type
          </option>
          <option value="Web Application">Web Application</option>
          <option value="Mobile Application">Mobile Application</option>
        </select>
        {errors.projectType && (
          <span className="error-message">{errors.projectType}</span>
        )}
      </div>

      <div className="button-group">
        <button onClick={handleCancel} className="btn btn-cancel">
          Cancel
        </button>

        <button onClick={handleCreateProject} className="btn btn-create">
          Create
        </button>
      </div>
    </div>
    </div>
  );
};

export default CreateProject;
