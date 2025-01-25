import React, { useState } from "react";
import { Save, X, Edit2, Trash2 } from 'lucide-react';

const WriteTestManually = () => {
  const [testSteps, setTestSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState("");
  const [editingStep, setEditingStep] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedValue, setEditedValue] = useState("");

  const handleAddStep = () => {
    if (currentStep !== "") {
      alert("Please save the current step before adding a new one.");
      return;
    }
    setTestSteps([
      ...testSteps,
      { stepNumber: testSteps.length + 1, choice: "", isSaved: false, isSelected: false },
    ]);
  };

  const handleSaveStep = (index) => {
    if (testSteps[index].choice.trim() === "") {
      alert("Please provide a choice for this step before saving.");
      return;
    }
    const updatedSteps = [...testSteps];
    updatedSteps[index].isSaved = true;
    setTestSteps(updatedSteps);
    setCurrentStep("");
  };

  const handleCancelStep = (index) => {
    const updatedSteps = [...testSteps];
    updatedSteps.splice(index, 1);
    setTestSteps(updatedSteps);
    setCurrentStep("");
  };

  const handleEditStep = (index) => {
    setEditingStep(index);
    setEditedValue(testSteps[index].choice);
    setModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updatedSteps = [...testSteps];
    updatedSteps[editingStep].choice = editedValue;
    setTestSteps(updatedSteps);
    setModalOpen(false);
    setEditingStep(null);
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = [...testSteps];
    updatedSteps.splice(index, 1);
    setTestSteps(updatedSteps);
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
        <div className="create-test-cases-page-container">
        <div className="create-test-cases-wrapper">
          <div className="flex justify-between items-center mb-6">
            <h2 className="create-test-cases-title">Write Test Manually</h2>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
              onClick={handleAddStep}
            >
              Add Test
            </button>
          </div>

          {testSteps.map((step, index) => (
            <div className="bg-white shadow-md p-4 mb-4 rounded-lg border border-gray-300"
              key={index}
              
            >

                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={step.isSelected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span className="font-medium">Step {step.stepNumber}</span>
                </div>

                <div className="flex items-center justify-between">

                {step.isSaved ? (
                  <div className="text-gray-700 mt-3 mb-3">{step.choice}</div>
                ) : (
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 mt-3 mb-3"
                    value={step.choice}
                    onChange={(e) => handleChangeStep(index, e.target.value)}
                    placeholder="Enter your test case"
                  />
                )}
              </div>

              <div className="flex space-x-2">
                {!step.isSaved ? (
                  <>
                    <button
                      className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors duration-200"
                      onClick={() => handleSaveStep(index)}
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => handleCancelStep(index)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200"
                      onClick={() => handleEditStep(index)}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200"
                      onClick={() => handleDeleteStep(index)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {modalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Edit Step</h3>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
                <div className="flex space-x-2">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors duration-200"
                    onClick={handleSaveEdit}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors duration-200"
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
    </div>
  );
};

export default WriteTestManually;
