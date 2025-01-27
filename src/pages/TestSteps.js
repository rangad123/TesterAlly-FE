
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Save, X, Edit2, Trash2, Plus, ArrowLeft } from "lucide-react";


const TestSteps = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { testCaseName, testCaseId } = location.state || {};
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingStep, setEditingStep] = useState(null);
    const [editedStepValue, setEditedStepValue] = useState("");
    
    const apiBaseUrl = "https://testerally-be-ylpr.onrender.com/api";

  useEffect(() => {
    if (!testCaseId) {
      navigate("/test-cases");
      return;
    }
    fetchSteps();
  }, [testCaseId]);

  const fetchSteps = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/teststeps/?testcase_id=${testCaseId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch test steps');
      }
      const data = await response.json();
      setSteps(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStep = async () => {
    try {
      const newStepNumber = steps.length > 0 
        ? Math.max(...steps.map(step => step.step_number)) + 1 
        : 1;

      const payload = {
        testcase: testCaseId,
        step_number: newStepNumber,
        step_description: "New step description"  
      };

      const response = await fetch(`${apiBaseUrl}/teststeps/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add step");
      }

      const addedStep = await response.json();
      setSteps(prevSteps => [...prevSteps, addedStep]);


      setEditingStep(addedStep.id);
      setEditedStepValue("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveEdit = async (stepId) => {
    if (!editedStepValue.trim()) {
      setError("Step description cannot be empty");
      return;
    }

    try {
      const stepToUpdate = steps.find(step => step.id === stepId);
      if (!stepToUpdate) return;

      const payload = {
        testcase: testCaseId,
        step_number: stepToUpdate.step_number,
        step_description: editedStepValue
      };

      const response = await fetch(`${apiBaseUrl}/teststeps/${stepId}/?testcase_id=${testCaseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update step");
      }

      const updatedStep = await response.json();
      setSteps(prevSteps =>
        prevSteps.map(step => step.id === stepId ? updatedStep : step)
      );
      setEditingStep(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteStep = async (stepId) => {
    if (!window.confirm("Are you sure you want to delete this step?")) return;

    try {
      const response = await fetch(`${apiBaseUrl}/teststeps/${stepId}/?testcase_id=${testCaseId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete step");
      }

      setSteps(prevSteps => {
        const filteredSteps = prevSteps.filter(step => step.id !== stepId);

        return filteredSteps.map((step, idx) => ({
          ...step,
          step_number: idx + 1
        }));
      });

      
      await Promise.all(steps
        .filter(step => step.id !== stepId)
        .map((step, idx) => 
          fetch(`${apiBaseUrl}/teststeps/${step.id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              testcase: testCaseId,
              step_number: idx + 1,
              step_description: step.step_description
            })
          })
        ));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">

          <div className="mb-6">
            <button
              onClick={() => navigate("/test-cases")}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test Cases
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Test Steps: {testCaseName}
              </h1>
              <button
                onClick={handleAddStep}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </button>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  {editingStep === step.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editedStepValue}
                        onChange={(e) => setEditedStepValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter step description"
                        autoFocus
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleSaveEdit(step.id)}
                          className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingStep(null);
                            setError(null);
                          }}
                          className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Step {step.step_number}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{step.step_description}</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setEditingStep(step.id);
                            setEditedStepValue(step.step_description);
                            setError(null);
                          }}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStep(step.id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSteps;