import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./CreateTestCases.css";


const CreateTestCases = ( ) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({ name: "", url: "" });
  const navigate = useNavigate(); 

  const validateFields = () => {
    let isValid = true;
    const newErrors = { name: "", url: "" };

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

  const handleCreateTestCase = () => {
    if (!validateFields()) return;

    alert("Test Case Created Successfully");

  };

  const handleCancel = () => {
    navigate("/dashboard-user"); 
  };

  const handleTestSuite = () => {
    navigate('/testsuite')
  };

  const handleWriteTestManually = () => {
    navigate("/write-manually");
  };

  return (
    <div className="page-container">
    <div className="create-test-cases-wrapper">
      <div className="button-top-right">
        <button onClick={handleTestSuite} className="test-suite-btn">
          Test Suite
        </button>
        <button onClick={handleCancel} className="btn btn-cancel">
          Cancel
        </button>
      </div>

      <div className="create-test-cases-container animated-fade-in">
        <h2 className="title animated-slide-in">Create Test Cases</h2>

        <div className="input-container">
          <label className="label">
            Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
            }}
            placeholder="Enter test case name"
            className={`input ${errors.name ? "error-border" : ""}`}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="input-container">
          <label className="label">
            URL<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, url: "" }));
            }}
            placeholder="Enter URL"
            className={`input ${errors.url ? "error-border" : ""}`}
          />
          {errors.url && <span className="error-message">{errors.url}</span>}
        </div>

        <div className="button-group">

          <button onClick={handleWriteTestManually} className="btn btn-manual">
            Write Test Manually
          </button>

          <button onClick={handleCreateTestCase} className="btn btn-create">
            Create
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateTestCases;
