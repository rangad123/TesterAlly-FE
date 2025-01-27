import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Save, X, Edit2, Trash2, Plus, ArrowLeft } from 'lucide-react';

const TestSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { testCaseName, testCaseId } = location.state || {};
  const [steps, setSteps] = useState([]);


  const [editingStep, setEditingStep] = useState(null);
  const [editedStepValue, setEditedStepValue] = useState('');

  useEffect(() => {
    
    setSteps([
      {
        id: 1,
        stepNumber: 1,
        description: 'Navigate to login page',
        isSelected: true
      },
      {
        id: 2,
        stepNumber: 2,
        description: 'Enter valid username and password',
        isSelected: true
      },
      {
        id: 3,
        stepNumber: 3,
        description: 'Click login button',
        isSelected: true
      }
    ]);

  }, [testCaseId]);

  const handleAddStep = () => {
    const newStep = {
      id: Date.now(), 
      stepNumber: steps.length + 1,
      description: '',
      isSelected: true,
      isEditing: true
    };
    setSteps([...steps, newStep]);
  };

  const handleSaveStep = (stepId) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId
          ? { ...step, isEditing: false }
          : step
      )
    );
  };

  const handleEditStep = (step) => {
    setEditingStep(step.id);
    setEditedStepValue(step.description);
  };

  const handleSaveEdit = (stepId) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId
          ? { ...step, description: editedStepValue }
          : step
      )
    );
    setEditingStep(null);
  };

  const handleDeleteStep = (stepId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this step?');
    if (!confirmDelete) return;

    setSteps(prevSteps => {
      const filteredSteps = prevSteps.filter(step => step.id !== stepId);

      return filteredSteps.map((step, index) => ({
        ...step,
        stepNumber: index + 1
      }));
    });
  };

  const handleStepChange = (stepId, value) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId
          ? { ...step, description: value }
          : step
      )
    );
  };

  const handleToggleStep = (stepId) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId
          ? { ...step, isSelected: !step.isSelected }
          : step
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">
          <div className="mb-6">
            <button
              onClick={() => navigate('/test-cases')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test Cases
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Test Steps: {testCaseName}
              </h1>
              <div className="flex space-x-3">
                <button
                  onClick={handleAddStep}
                  className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </button>
                
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <input
                      type="checkbox"
                      checked={step.isSelected}
                      onChange={() => handleToggleStep(step.id)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="font-medium">Step {step.stepNumber}</span>
                  </div>

                  {editingStep === step.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editedStepValue}
                        onChange={(e) => setEditedStepValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
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
                          onClick={() => setEditingStep(null)}
                          className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : step.isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={step.description}
                        onChange={(e) => handleStepChange(step.id, e.target.value)}
                        placeholder="Enter step description"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleSaveStep(step.id)}
                          className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </button>
                        <button
                          onClick={() => handleDeleteStep(step.id)}
                          className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 mb-3">{step.description}</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditStep(step)}
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