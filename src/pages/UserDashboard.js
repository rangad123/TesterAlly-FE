import React from "react";
import "./style.css";

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="main-content">
        {/* Hero Section */}
        <div className="text-center space-y-5">
          <h1 className="text-5xl font-bold">Welcome to TesterAlly</h1>
          <p className="text-xl text-gray-600">
            AI-based Test Automation Tool to simplify your testing process. Empower your testing with the power of AI.
          </p>
        </div>


        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <FeatureCard
              title="AI-Based Automation"
              description="Automate repetitive testing tasks using AI-driven workflows."
              icon="🤖"
            />
            <FeatureCard
              title="Vision Agent"
              description="Capture coordinates of elements from images for precise operations."
              icon="👁"
            />
            <FeatureCard
              title="Streamlined Testing"
              description="Perform complex testing actions like button clicks and form filling."
              icon="⚡"
            />
          </div>
        </div>

        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <StepCard
              step="1"
              title="Upload Image"
              description="Upload an image containing the UI to be tested."
            />
            <StepCard
              step="2"
              title="Process Coordinates"
              description="Let AI analyze the image and extract element coordinates."
            />
            <StepCard
              step="3"
              title="Perform Actions"
              description="Use the extracted data to automate testing operations."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="feature-cards">
    <div className="feature-icon">{icon}</div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ step, title, description }) => (
  <div className="step-card">
    <div className="step-icon">{step}</div>
    <h4 className="step-title">{title}</h4>
    <p className="step-description">{description}</p>
  </div>
);


export default UserDashboard;
