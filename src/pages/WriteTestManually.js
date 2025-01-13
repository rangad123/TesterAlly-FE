import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WriteManually.css";
import { AiOutlineClose } from "react-icons/ai";

const WriteTestManually = ({ setShowWriteTestManually }) => {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (!url.trim() || !username.trim() || !password.trim()) {
      setError("All fields are required!");
      return;
    }

    const steps = [
      `1. Open the URL: ${url}`,
      `2. Enter the username: ${username}`,
      `3. Enter the password: ${password}`,
      `4. Click on Login.`,
    ];

    const confirmed = window.alert(
      `Test steps saved successfully!\n\n${steps.join("\n")}`
    );

    if (confirmed !== undefined) {
      setShowWriteTestManually(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard-user");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 ml-[300px] transition-all duration-300 max-w-[calc(100%-300px)]">
        <div className="p-6">
    <div className="write-manually-page">
      <div className="write-manually-page-wrapper">

      <div className="wm-container">
        <div className="create-test-cases-header">
          <h2 className="create-test-cases-title">Write Test Manually</h2>
                      
          <div className="create-test-cases-button-group-right">
            <button onClick={handleCancel} className="cancel-btn">
              <AiOutlineClose className="inline-icon" />
              Cancel
            </button>
          </div>
        </div>

        {error && <div className="wm-error">{error}</div>}

        {step === 1 && (
          <div className="wm-step">
            <label className="wm-label">
              Step 1: Open the URL <span className="wm-required">*</span>
            </label>
            <input
              type="text"
              className="wm-input"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="Enter the URL"
            />
            <button
              className="wm-next-btn"
              onClick={() => setStep(2)}
              disabled={!url.trim()}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="wm-step">
            <label className="wm-label">
              Step 2: Enter the Username <span className="wm-required">*</span>
            </label>
            <input
              type="text"
              className="wm-input"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter the Username"
            />
            <div className="wm-review">
              <p>
                <span>Entered URL:</span> {url}
                <button className="wm-edit-btn" onClick={() => setStep(1)}>
                  Edit
                </button>
              </p>
            </div>
            <button
              className="wm-next-btn"
              onClick={() => setStep(3)}
              disabled={!username.trim()}
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="wm-step">
            <label className="wm-label">
              Step 3: Enter the Password <span className="wm-required">*</span>
            </label>
            <input
              type="password"
              className="wm-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter the Password"
            />
            <div className="wm-review">
              <p>
                <span>Entered URL:</span> {url}
                <button className="wm-edit-btn" onClick={() => setStep(1)}>
                  Edit
                </button>
              </p>
              <p>
                <span>Entered Username:</span> {username}
                <button className="wm-edit-btn" onClick={() => setStep(2)}>
                  Edit
                </button>
              </p>
            </div>
            <button
              className="wm-save-btn"
              onClick={handleSave}
              disabled={!password.trim()}
            >
              Save
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default WriteTestManually;
