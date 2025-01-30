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
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/dashboard-user");
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
      const info = location.state?.testCaseInfo;
    
      if (!info || !info.name || !info.testcase_type || !info.testcase_priority) {
        alert("Test case data is incomplete or missing.");
        navigate("/test-cases/create-testcases");
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
        setShowUrlInput(false);
      } else if (response.status === 404) {
        setShowUrlInput(true);
        setTestSteps([]);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
      setShowUrlInput(true);
      setTestSteps([]);
    }
  };

  const handleCreateTestCase = async () => {

    try {

      const testCaseResponse = await fetch("https://testerally-be-ylpr.onrender.com/api/testcases/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: testCaseInfo.projectId,
          name: testCaseInfo.name,
          testcase_type: testCaseInfo.testcase_type,
          testcase_priority: testCaseInfo.testcase_priority
        })
      });

      if (!testCaseResponse.ok) {
        throw new Error("Failed to create test case");
      }

      const testCaseData = await testCaseResponse.json();
      
      const testCaseId = testCaseData.id;

      const stepPromises = testSteps
        .filter(step => step.isSelected && step.isSaved)
        .map(async (step, index) => {
          const stepResponse = await fetch("https://testerally-be-ylpr.onrender.com/api/teststeps/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              testcase: testCaseId,
              step_number: index + 1,
              step_description: step.choice
            })
          });

          if (!stepResponse.ok) {
            throw new Error(`Failed to create step ${index + 1}`);
          }

          return stepResponse.json();
        });

      await Promise.all(stepPromises);
      alert("Test Case and Steps Created Successfully");
      navigate("/test-cases");

    } catch (error) {
      console.error("Error creating test case and steps:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleUrlSubmit = async () => {
    if (!testCaseInfo.projectId) {
      alert("Project ID is missing.");
      return;
    }
  
    const finalUrl = url.startsWith("http") ? url : `https://${url}`;
    const payload = { url: finalUrl };

    try {
      console.log("Sending payload:", payload);
  
      const response = await fetch(
        `https://testerally-be-ylpr.onrender.com/api/testdata/${testCaseInfo.projectId}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setTestSteps([{
          stepNumber: 1,
          choice: `Navigate to URL: ${data.url}`,
          isSaved: true,
          isSelected: true,
        }]);
        setShowUrlInput(false);
      } else {
        const errorText = await response.text();
        console.error("Failed to save URL. Response:", errorText);
        alert("Failed to save URL.");
      }
    } catch (error) {
      console.error("Error saving URL:", error);
      alert("Error saving URL");
    }
  };
  
  

  const handleAddStep = () => {
    const lastStep = testSteps[testSteps.length - 1];
    if (!lastStep?.isSaved) {
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

  const handleSaveStep = (index) => {
    if (testSteps[index].choice.trim() === "") {
      alert("Please provide a step description before saving.");
      return;
    }

    const updatedSteps = [...testSteps];
    updatedSteps[index].isSaved = true;
    setTestSteps(updatedSteps);
  };

  const handleDeleteStep = (index) => {
    if (testSteps.length === 1) {
      alert("Cannot delete the first step. You must have at least one step.");
      return;
    }
    const updatedSteps = testSteps.filter((_, idx) => idx !== index);
    updatedSteps.forEach((step, idx) => {
      step.stepNumber = idx + 1;
    });
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
                required
              />
              <button
                onClick={handleUrlSubmit}
                className="bg-purple-600 text-white px-4 py-2 rounded"
                disabled={!url}
              >
                Save URL
              </button>
            </div>
          ) : null}

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Write Test Manually</h2>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                onClick={handleCreateTestCase}
              >
                Create Test Case
              </button>
            </div>

            {testSteps.map((step, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 bg-white p-4 mb-4 rounded-lg border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={step.isSelected}
                  onChange={() => {
                    const updatedSteps = [...testSteps];
                    updatedSteps[index].isSelected = !updatedSteps[index].isSelected;
                    setTestSteps(updatedSteps);
                  }}
                  className="w-5 h-5 text-purple-600"
                />
                
                <span className="font-medium min-w-[60px]">#{step.stepNumber}</span>
                
                {step.isSaved ? (
                  <div className="flex-1 text-gray-700 break-words whitespace-pre-wrap overflow-hidden">
                  {step.choice}
                </div>
                
                ) : (
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-md p-2"
                    value={step.choice}
                    onChange={(e) => {
                      const updatedSteps = [...testSteps];
                      updatedSteps[index].choice = e.target.value;
                      setTestSteps(updatedSteps);
                    }}
                    placeholder="Enter test step description"
                  />
                )}

                <div className="flex gap-2">
                  {!step.isSaved ? (
                    <>
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                        onClick={() => handleSaveStep(index)}
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100"
                        onClick={() => handleDeleteStep(index)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => {
                          const updatedSteps = [...testSteps];
                          updatedSteps[index].isSaved = false;
                          setTestSteps(updatedSteps);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {testSteps.length > 1 && (
                        <button
                          className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                          onClick={() => handleDeleteStep(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {testSteps.length > 0 && testSteps[testSteps.length - 1].isSaved && (
              <button
                onClick={handleAddStep}
                className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteTestManually;