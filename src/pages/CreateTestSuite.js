import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTestSuite.css";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const CreateTestSuite = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preRequisite, setPreRequisite] = useState("");
  const [labels, setLabels] = useState("");
  const [errors, setErrors] = useState({}); // State to store error messages

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title of the test suite is required.";
    }
    return newErrors;
  };

  const handleCreate = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log({ title, description, preRequisite, labels });
    navigate("/test-suite");
  };

  const handleCancel = () => {
    navigate("/testsuite");
  };

  return (
    <div className="create-test-suite-container">
      <div className="create-test-suite-content">
        <div className="create-test-cases-header">
          <h2 className="create-test-cases-title">Create Test Suite</h2>
              
          <div className="create-test-cases-button-group-right">
            <button onClick={handleCancel} className="cancel-btn">
              <AiOutlineClose className="inline-icon" />
              Cancel
            </button>
            <button onClick={handleCreate} className="create-btn">
              <AiOutlinePlus className="inline-icon" />
              Create
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
          <div className="create-test-suite-input-group">
            <label className="create-test-suite-label">Select Test Cases</label>
            <button type="button" className="create-test-suite-btn-add-test-case">
              + Add Test Cases
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestSuite;
