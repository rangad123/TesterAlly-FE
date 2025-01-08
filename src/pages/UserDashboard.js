import React from "react";
import "./style.css";
import ProjectSidebar from "./Projectsidebar";

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <ProjectSidebar />
      <div className="main-content">

        <div className="text-center space-y-5">
          <h1 className="text-5xl font-bold">Welcome to TesterAlly</h1>
          <p className="text-xl text-gray-600">
            AI-based Test Automation Tool to simplify your testing process. Empower your testing with the power of AI.
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
