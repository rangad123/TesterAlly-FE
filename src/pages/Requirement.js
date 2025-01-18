import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTestSuite.css";
import "./Requirement.css";
import { AiOutlineClose } from "react-icons/ai";

const Requirement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [labels, setLabels] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title of the requirement is required.";
    }
    if (!type.trim()) {
      newErrors.type = "Type selection is required.";
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required.";
    }
    if (!completionDate) {
      newErrors.completionDate = "Completion date is required.";
    }
    return newErrors;
  };

  const handleCreate = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      alert("Requirement Created Successfully");

      setTitle("");
      setDescription("");
      setType("");
      setStartDate("");
      setCompletionDate("");
      setLabels("");

      navigate("/create-requirement");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/requirement-type");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">
          <div className="create-test-suite-container">
            <div className="create-test-suite-content">
              <div className="create-test-cases-header">
                <h2 className="create-test-cases-title">Create Requirement</h2>

                <div className="create-test-cases-button-group-right">
                  <button onClick={handleCancel} className="cancel-btn">
                    <AiOutlineClose className="inline-icon" /> Cancel
                  </button>
                  <button onClick={handleCreate} className="create-btn" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>

              <form className="create-test-suite-form">
                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Name:*</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter requirement name"
                    className={`create-test-suite-input ${errors.title ? "error-border" : ""}`}
                  />
                  {errors.title && <p className="error-message">{errors.title}</p>}
                </div>

                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Description (Optional):</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="create-test-suite-textarea"
                  ></textarea>
                </div>

                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Select Type:*</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={`create-test-suite-select ${errors.type ? "error-border" : ""}`}
                  >
                    <option value="">Select</option>
                    <option value="Functional">Functional</option>
                    <option value="Non-Functional">Non-Functional</option>
                    <option value="Regression">Regression</option>
                  </select>
                  {errors.type && <p className="error-message">{errors.type}</p>}
                </div>

                <div className="create-test-suite-date-row">
                  <div className="create-test-suite-date-group">
                    <label className="create-test-suite-label">Start Date:*</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={`create-test-suite-input ${errors.startDate ? "error-border" : ""}`}
                    />
                    {errors.startDate && <p className="error-message">{errors.startDate}</p>}
                  </div>
                  <div className="create-test-suite-date-group">
                    <label className="create-test-suite-label">Completion Date:*</label>
                    <input
                      type="date"
                      value={completionDate}
                      onChange={(e) => setCompletionDate(e.target.value)}
                      className={`create-test-suite-input ${errors.completionDate ? "error-border" : ""}`}
                    />
                    {errors.completionDate && <p className="error-message">{errors.completionDate}</p>}
                  </div>
                </div>

                <div className="create-test-suite-input-group">
                  <label className="create-test-suite-label">Planned Automation Count</label>
                  <input
                    type="number"
                    value={labels}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(value) && Number.isInteger(parseFloat(value))) {
                        setLabels(value);
                      }
                    }}
                    placeholder="Enter Planned Automation"
                    className="create-test-suite-input"
                    min="0"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirement;
