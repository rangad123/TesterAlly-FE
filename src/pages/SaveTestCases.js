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
        <h1 className="animated-title">Saved Test Cases</h1>
        <p className="description">Manage your test cases with AI-generated insights.</p>

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
    </div>
  );
}
