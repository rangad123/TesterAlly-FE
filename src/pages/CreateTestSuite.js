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
    <div className="page-container">
    <div className="create-test-suite-page">
      <div className="header">
        <button onClick={handleCancel} className="btn btn-cancel">
          Cancel
        </button>
        <button onClick={handleCreate} className="btn btn-create">
          Create
        </button>
      </div>
      <div className="content">
        <h1>Create Test Suite</h1>
        <form className="form">
          <div className="input-group">
            <label className="label">Title of the Test Suite *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter test suite title"
              className="input"
            />
          </div>
          <div className="input-group">
            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="textarea"
            ></textarea>
          </div>
          <div className="input-group">
            <label className="label">Pre-Requisite</label>
            <textarea
              value={preRequisite}
              onChange={(e) => setPreRequisite(e.target.value)}
              placeholder="Enter pre-requisites"
              className="textarea"
            ></textarea>
          </div>
          <div className="input-group">
            <label className="label">Labels</label>
            <input
              type="text"
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
              placeholder="Enter labels (comma-separated)"
              className="input"
            />
          </div>
          <div className="input-group">
            <label className="label">Select Test Cases</label>
            <button className="btn btn-add-test-case">+ Add Test Cases</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateTestSuite;
