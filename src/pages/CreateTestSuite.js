import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTestSuite.css";

const CreateTestSuite = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preRequisite, setPreRequisite] = useState("");
  const [labels, setLabels] = useState("");

  const navigate = useNavigate();

  const handleCreate = () => {
    if (!title.trim()) {
      alert("Title of the test suite is required!");
      return;
    }
    alert("Test Suite Created Successfully!");
    navigate("/test-suite");
  };

  const handleCancel = () => {
    navigate("/testsuite");
  };

  return (
    <div className="create-test-suite-container">
      <div className="create-test-suite-header">
        <button onClick={handleCancel} className="create-test-suite-btn-cancel">
          Cancel
        </button>
        <button onClick={handleCreate} className="create-test-suite-btn-create">
          Create
        </button>
      </div>
      <div className="create-test-suite-content">
        <h1 className="animated-slide-in">Create Test Suite</h1>
        <form className="create-test-suite-form">
          <div className="create-test-suite-input-group">
            <label className="create-test-suite-label">Title of the Test Suite *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter test suite title"
              className="create-test-suite-input"
            />
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
            <button className="create-test-suite-btn-add-test-case">+ Add Test Cases</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestSuite;
