import React, { useEffect, useState } from "react";
import "./SaveTestCases.css";

export default function SaveTestCases() {
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = [
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
      ];
      setTestCases(response);
    };
    fetchData();
  }, []);

  return (
    <div className="page-container">
      <div className="main-content">
        {/* Title and description */}
        <h1 className="animated-title">Saved Test Cases</h1>
        <p className="description">
          Saved test cases in Testsigma serve as reusable components for automated testing. They allow testers to quickly build, update, and execute test scenarios without coding, ensuring consistency and reducing redundancy. This improves efficiency and accelerates the test automation process.
        </p>

        {/* Table container */}
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

        {/* Efficiency section */}
        <div className="efficiency-section">
          <h2>Why Use Saved Test Cases?</h2>
          <ul className="benefits-list">
            <li>
              <strong>Reusable Components:</strong> Saved test cases can be reused across multiple test scenarios, reducing redundancy.
            </li>
            <li>
              <strong>No Coding Required:</strong> Build and execute test scenarios easily without needing coding expertise.
            </li>
            <li>
              <strong>Consistency:</strong> Maintain consistency across testing processes for reliable results.
            </li>
            <li>
              <strong>Efficiency:</strong> Accelerate test automation and reduce effort in creating new test cases.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
