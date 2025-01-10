import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import './TestCases.css';
import "./SaveTestCases.css";

const TestCases = () => {

    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate('/create-testcases'); 
      };

  const [testCases] = useState([
    {
        title: "Login Test",
        requirement: "Verify login functionality using AI models",
        assignee: "John Doe",
        result: "Passed",
        status: "Completed",
    },
    {
        title: "Signup Test",
        requirement: "Validate signup with edge cases",
        assignee: "Jane Smith",
        result: "Failed",
        status: "In Progress",
      },
      {
        title: "Performance Test",
        requirement: "Analyze system load capacity",
        assignee: "AI Bot",
        result: "Pending",
        status: "Pending",
      },
  ]);

  return (
    <div className="test-cases-container">
      <div className="test-cases-header">
        <div className="test-cases-tabs">
          <button className="tab-active" >Test Cases</button>
          <button>Step Groups</button>
        </div>
        <div className="test-cases-actions">
          <button className="create-btn" onClick={handleCreateClick}> <AiOutlinePlus className="inline-icon" /> Create</button>
        </div>
      </div>

      <div className="sub-header">
        <div className="left-section">
          <span className="all-cases">All Test Cases</span>
        </div>
        <div className="right-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>

      <div className="test-case-table">
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Requirement</th>
                  <th>Assignee</th>
                  <th>Result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {testCases.length > 0 ? (
                  testCases.map((testCase, index) => (
                    <tr key={index} className="table-row">
                      <td>{testCase.title}</td>
                      <td>{testCase.requirement}</td>
                      <td>{testCase.assignee}</td>
                      <td>
                        <span className={`result-badge ${testCase.result.toLowerCase()}`}>
                          {testCase.result}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            testCase.status === "Completed"
                              ? "completed"
                              : testCase.status === "In Progress"
                              ? "in-progress"
                              : "pending"
                          }`}
                        >
                          {testCase.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No test cases found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
};

export default TestCases;