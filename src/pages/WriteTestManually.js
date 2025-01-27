import React, { useState, useEffect } from "react";
import { Save, X, Edit2, Trash2, Plus } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";

const WriteTestManually = () => {
  const [testSteps, setTestSteps] = useState([]);
  const [testCaseInfo, setTestCaseInfo] = useState({
    name: '',
    type: '',
    priority: ''
  });
  const [editMode, ] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editingStep, setEditingStep] = useState(null);
  const [, setTestData] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [createdTestCaseId, setCreatedTestCaseId] = useState(null);

  useEffect(() => {
    
    const info = location.state?.testCaseInfo;
    if (!info) {
      
      navigate("/create-test-cases");
      return;
    }
    setTestCaseInfo(info);
    fetchTestData(info.projectId);
  }, [location, navigate]);

  const fetchTestData = async (projectId) => {
    if (!projectId) return;

    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testdata/${projectId}/`
      );
      if (response.ok) {
        const data = await response.json();
        
        const initialStep = {
          stepNumber: 1,
          choice: `Navigate to URL: ${data.url}`,
          isSaved: true,
          isSelected: true
        };
        setTestSteps([initialStep]);

        if (createdTestCaseId) {
          await saveStepToAPI(initialStep, createdTestCaseId);
        }
      } else {
        setShowUrlInput(true);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
      setShowUrlInput(true);
    }
  };

  const saveStepToAPI = async (step, testCaseId) => {
    try {
      const response = await fetch("https://testerally-be-ylpr.onrender.com/api/teststeps/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testcase: testCaseId,
          step_number: step.stepNumber,
          step_description: step.choice
        })
      });

      if (!response.ok) {
        throw new Error("Failed to save step");
      }

      return await response.json();
    } catch (error) {
      console.error("Error saving step:", error);
      throw error;
    }
  };

  const handleCreateTestCase = async () => {
    if (!testCaseInfo) {
      alert("Missing test case information!");
      return;
    }

    const selectedSteps = testSteps
      .filter(step => step.isSelected && step.isSaved)
      .map(step => step.choice);

    if (selectedSteps.length === 0) {
      alert("Please add and save at least one test step.");
      return;
    }

    const payload = {
      project_id: testCaseInfo.projectId,
      name: testCaseInfo.name,
      type: testCaseInfo.type,
      priority: testCaseInfo.priority,
      steps: selectedSteps
    };

    try {
      const response = await fetch("https://testerally-be-ylpr.onrender.com/api/testcases/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const testCase = await response.json();
        setCreatedTestCaseId(testCase.id);

        for (const step of testSteps.filter(s => s.isSelected && s.isSaved)) {
          await saveStepToAPI(step, testCase.id);
        }

        alert("Test Case Created Successfully");
        navigate("/test-cases");

      } else {
        const errorData = await response.json();
        alert(`Failed to create test case: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleUrlSubmit = async () => {
    const projectId = JSON.parse(localStorage.getItem(`selectedProject_${localStorage.getItem("userId")}`))?.id;
    if (!projectId) return;

    try {
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testdata/${projectId}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTestData(data);
        setTestSteps([{
          stepNumber: 1,
          choice: `Navigate to URL: ${data.url}`,
          isSaved: true,
          isSelected: true
        }]);
        setShowUrlInput(false);
      } else {
        alert("Failed to save URL");
      }
    } catch (error) {
      console.error("Error saving URL:", error);
      alert("Error saving URL");
    }
  };


  const handleAddStep = async () => {
    const lastStep = testSteps[testSteps.length - 1];
    if (!lastStep.isSaved) {
      alert("Please save the current step before adding a new one.");
      return;
    }
    
    const newStep = {
      stepNumber: testSteps.length + 1,
      choice: "",
      isSaved: false,
      isSelected: true
    };
    
    setTestSteps([...testSteps, newStep]);
  };

  const handleSaveStep = async (index) => {
    if (testSteps[index].choice.trim() === "") {
      alert("Please provide a choice for this step before saving.");
      return;
    }

    const updatedSteps = [...testSteps];
    updatedSteps[index].isSaved = true;
    setTestSteps(updatedSteps);

    if (createdTestCaseId) {
      try {
        await saveStepToAPI(updatedSteps[index], createdTestCaseId);
      } catch (error) {
        alert("Failed to save step to server");

        updatedSteps[index].isSaved = false;
        setTestSteps(updatedSteps);
      }
    }
  };

  const handleCancelStep = (index) => {
    if (testSteps.length === 1) {
      alert("Cannot delete the first step. You must have at least one step.");
      return;
    }
    const updatedSteps = [...testSteps];
    updatedSteps.splice(index, 1);
    updatedSteps.forEach((step, idx) => {
      step.stepNumber = idx + 1;
    });
    setTestSteps(updatedSteps);
  };

  const handleEditStep = (index) => {
    setEditingStep(index);
    setEditedValue(testSteps[index].choice);
    setModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editedValue.trim() === "") {
      alert("Step cannot be empty");
      return;
    }
    const updatedSteps = [...testSteps];
    updatedSteps[editingStep].choice = editedValue;
    setTestSteps(updatedSteps);
    setModalOpen(false);
    setEditingStep(null);
  };

  

  const handleChangeStep = (index, value) => {
    const updatedSteps = [...testSteps];
    updatedSteps[index].choice = value;
    setTestSteps(updatedSteps);
  };

  const handleCheckboxChange = (index) => {
    const updatedSteps = [...testSteps];
    updatedSteps[index].isSelected = !updatedSteps[index].isSelected;
    setTestSteps(updatedSteps);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">

        {showUrlInput ? (
            <div className="mb-6 p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium mb-2">Enter Test URL</h3>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Enter URL"
              />
              <button
                onClick={handleUrlSubmit}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Save URL
              </button>
            </div>
          ) : null}

          <div className="create-test-cases-wrapper">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editMode ? 'Edit Test Case' : 'Write Test Manually'}
              </h2>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                onClick={handleCreateTestCase}
              >
                {editMode ? 'Update Test Case' : 'Create Test Case'}
              </button>
            </div>

            {testSteps.map((step, index) => (
              <div 
                className="bg-white shadow-md p-4 mb-4 rounded-lg border border-gray-300"
                key={index}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={step.isSelected}
                      onChange={() => handleCheckboxChange(index)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="font-medium">Step {step.stepNumber}</span>
                  </div>
                  {index === testSteps.length - 1 && step.isSaved && (
                    <button
                      onClick={handleAddStep}
                      className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Step
                    </button>
                  )}
                </div>

                <div className="mb-3">
                  {step.isSaved ? (
                    <div className="text-gray-700">{step.choice}</div>
                  ) : (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={step.choice}
                      onChange={(e) => handleChangeStep(index, e.target.value)}
                      placeholder="Enter your test step"
                    />
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  {!step.isSaved ? (
                    <>
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                        onClick={() => handleSaveStep(index)}
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100"
                        onClick={() => handleCancelStep(index)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => handleEditStep(index)}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      {testSteps.length > 1 && (
                        <button
                          className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                          onClick={() => handleCancelStep(index)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {modalOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                  <h3 className="text-xl font-bold mb-4">Edit Step</h3>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                      onClick={handleSaveEdit}
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100"
                      onClick={() => setModalOpen(false)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteTestManually;