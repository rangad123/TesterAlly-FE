import React from "react";


const ProjectDetails = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Project Details</h1>
            
            <div className="space-y-6">
              {/* Project Name Section */}
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Project Name</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600">Simply Travel (Demo)</p>
                </div>
              </div>

              {/* Project Description Section */}
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Project Description</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600">
                    A comprehensive travel booking and management system designed to streamline the travel planning process.
                  </p>
                </div>
              </div>

              {/* Project Status Section */}
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Project Status</h2>
                <div className="bg-gray-50 p-4 rounded-md flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-gray-600">Active</p>
                </div>
              </div>

              {/* Project Timeline Section */}
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Timeline</h2>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Start Date:</p>
                    <p className="text-gray-800 font-medium">January 15, 2025</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Expected Completion:</p>
                    <p className="text-gray-800 font-medium">June 30, 2025</p>
                  </div>
                </div>
              </div>

              {/* Project Statistics Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Project Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-600 text-sm">Total Test Cases</p>
                    <p className="text-2xl font-semibold text-blue-600">124</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-600 text-sm">Test Suites</p>
                    <p className="text-2xl font-semibold text-blue-600">8</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-600 text-sm">Team Members</p>
                    <p className="text-2xl font-semibold text-blue-600">12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default ProjectDetails;