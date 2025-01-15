import React from "react";
import "./TestSuite.css";
import { useNavigate } from "react-router-dom";

const TestSuite = () => {

    const navigate = useNavigate(); 

  const handleCreateTestSuite = () => {
    navigate("/test-suites/create-testsuite")
  };

  return (
    <div className="page-container">
    <div className="test-suite-page">
      <div className="test-suite-container">
        <h1 className="animated-title">Test Suite</h1>
        <button
          onClick={handleCreateTestSuite}
          className="create-test-suite-btn animated-btn"
        >
          + Create Test Suite
        </button>
      </div>
    </div>
    </div>
  );
};

export default TestSuite;
