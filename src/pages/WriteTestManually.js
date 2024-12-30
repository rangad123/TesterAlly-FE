import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./WriteManually.css";

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

    alert(`Test steps saved successfully!\n\n${steps.join("\n")}`);
    setShowWriteTestManually(false);
  };

  const handleCancel = () => {
    navigate("/dashboard-user"); 
  };


  return (
    <div className="page-container">
      <button onClick={handleCancel} className="btn-cancel-top-right" aria-label="Cancel and close the modal">
        Cancel
      </button>

      <div className="write-test-manually-container animated-fade-in">
      <h2 className="title animated-slide-in">Write Test Manually</h2>

      {error && <div className="error-message">{error}</div>}


      {step === 1 && (
        <div className="step-item">
          <label className="step-label">
            Step 1: Open the URL<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            className="step-input"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="Enter the URL"
          />
          <button
            className="btn-next"
            onClick={() => setStep(2)}
            disabled={!url.trim()}
          >
            Next
          </button>
        </div>
      )}


      {step === 2 && (
        <div className="step-item">
          <label className="step-label">
            Step 2: Enter the Username<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            className="step-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            placeholder="Enter the Username"
          />
          <div className="entered-data">
            <p>
              Entered URL: {url}
              {url && <button className="btn-edit" onClick={() => setStep(1)}>Edit</button>}
            </p>
            <p>
              Entered Username: {username}
              {username && <button className="btn-edit" onClick={() => setStep(2)}>Edit</button>}
            </p>
          </div>
          <button
            className="btn-next"
            onClick={() => setStep(3)}
            disabled={!username.trim()}
          >
            Next
          </button>
        </div>
      )}


      {step === 3 && (
        <div className="step-item">
          <label className="step-label">
            Step 3: Enter the Password<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            className="step-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter the Password"
          />
          <div className="entered-data">
            <p>
              Entered URL: {url}
              {url && <button className="btn-edit" onClick={() => setStep(1)}>Edit</button>}
            </p>
            <p>
              Entered Username: {username}
              {username && <button className="btn-edit" onClick={() => setStep(2)}>Edit</button>}
            </p>
            <p>
              Entered Password: {password ? "******" : ""}
              {password && <button className="btn-edit" onClick={() => setStep(3)}>Edit</button>}
            </p>
          </div>
          <button
            className="btn-next"
            onClick={handleSave}
            disabled={!password.trim()}
          >
            Login
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default WriteTestManually;
