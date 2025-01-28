import React, { useState, useEffect, useCallback } from "react";
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
  const [editValue, setEditValue] = useState("");
  const [newStepValue, setNewStepValue] = useState("");

  const apiBaseUrl = "https://testerally-be-ylpr.onrender.com/api";


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const savedProjectKey = `selectedProject_${userId}`;
    const savedProject = localStorage.getItem(savedProjectKey);

    if (savedProject) {
      try {
        JSON.parse(savedProject);
      } catch (err) {
        console.error("Error parsing saved project:", err);
        localStorage.removeItem(savedProjectKey);
      }
    }

    const handleProjectChange = () => {
      
      navigate("/test-cases");
    };

    window.addEventListener("projectChanged", handleProjectChange);
    return () => window.removeEventListener("projectChanged", handleProjectChange);
  }, [navigate]); 

  useEffect(() => {
    if (!testCaseId) {
      navigate("/test-cases");
    }
  }, [testCaseId, testCaseName, navigate]); 

  const fetchSteps = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/teststeps/?testcase_id=${testCaseId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch test steps');
      }
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.step_number - b.step_number);
      setSteps(sortedData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching steps:", err);
    } finally {
      setLoading(false);
    }
  }, [testCaseId]);

  useEffect(() => {
    if (!testCaseId) {
      navigate("/test-cases");
      return;
    }
    fetchSteps();
  }, [testCaseId, navigate, fetchSteps]);

  const handleDeleteStep = async (stepId) => {
    if (!window.confirm("Are you sure you want to delete this step?")) return;
    setError(null);
    
    try {
      const deleteResponse = await fetch(`${apiBaseUrl}/teststeps/${stepId}/?testcase_id=${testCaseId}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete step");
      }

      const updatedSteps = steps.filter(step => step.id !== stepId);
      const updatePromises = updatedSteps.map(async (step, index) => {
        const response = await fetch(`${apiBaseUrl}/teststeps/${step.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            testcase: testCaseId,
            step_number: index + 1,
            step_description: step.step_description
          })
        });
        if (!response.ok) {
          throw new Error("Failed to update step numbers");
        }
        return response.ok;
      });

      await Promise.all(updatePromises);
      await fetchSteps();
    } catch (err) {
      setError("Error deleting step. Please try again.");
      console.error("Delete operation failed:", err);
    }
  };

  const handleAddStep = async () => {
    if (!newStepValue.trim()) {
      setError("Step description cannot be empty");
      return;
    }

    try {
      const newStepNumber = steps.length + 1;
      const response = await fetch(`${apiBaseUrl}/teststeps/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testcase: parseInt(testCaseId),
          step_number: newStepNumber,
          step_description: newStepValue.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add step");
      }
      
      await fetchSteps();
      setNewStepValue("");
      setError(null);
    } catch (err) {
      setError("Failed to add step. Please try again.");
      console.error("Error adding step:", err);
    }
  };

  const startEditing = (step) => {
    setEditingStep(step.id);
    setEditValue(step.step_description);
  };

  const handleUpdateStep = async (stepId) => {
    if (!editValue.trim()) {
      setError("Step description cannot be empty");
      return;
    }

    try {
      const step = steps.find(s => s.id === stepId);
      if (!step) {
        throw new Error("Step not found");
      }

      const updateData = {
        step_number: step.step_number,
        step_description: editValue.trim()
      };

      const response = await fetch(`${apiBaseUrl}/teststeps/${stepId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update step");
      }

      await fetchSteps();
      setEditingStep(null);
      setEditValue("");
      setError(null);
    } catch (err) {
      setError("Failed to update step. Please try again.");
      console.error("Error updating step:", err);
    }
  };

  const cancelEdit = () => {
    setEditingStep(null);
    setEditValue("");
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex-1 lg:ml-[300px] p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full ">
      <div className="p-6">
        <button
          onClick={() => navigate("/test-cases")}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Test Cases
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{testCaseName}</h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-6 flex items-center gap-2 ">
            <input
              type="text"
              value={newStepValue}
              onChange={(e) => setNewStepValue(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              placeholder="Enter new test step"
            />
            <button
              onClick={handleAddStep}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </button>
          </div>

          <div className="space-y-3 ">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4"
              >
                <span className="min-w-[60px] font-medium">#{step.step_number}</span>
                
                {editingStep === step.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdateStep(step.id);
                        } else if (e.key === 'Escape') {
                          cancelEdit();
                        }
                      }}
                    />
                    <button
                      onClick={() => handleUpdateStep(step.id)}
                      className="p-2 text-green-600 hover:text-green-700"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 text-gray-600 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 text-gray-700 break-words whitespace-pre-wrap overflow-hidden" >{step.step_description}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(step)}
                        className="p-2 text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStep(step.id)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSteps;
