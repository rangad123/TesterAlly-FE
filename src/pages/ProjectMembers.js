import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProjectMembers = () => {
  const members = [
    { name: "Automation Tester", email: "kumar.testsigma@gmail.com", role: "Test Manager" },
    { name: "K K", email: "kkabap@gmail.com", role: "Test Manager" },
    { name: "Krishna Sakinala", email: "automationtesting2016@gmail.com", role: "Test Manager" },
    { name: "Krishna Kumar", email: "krishna.testsigma@gmail.com", role: "Test Manager" },
  ];

  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/dashboard/login"); 
        return;
      }
      const savedProjectKey = `selectedProject_${userId}`;
      const savedProject = localStorage.getItem(savedProjectKey);
      
      if (savedProject) {
        setSelectedProject(JSON.parse(savedProject));
      } else {
        navigate("/dashboard-user");
      }
  
      const handleProjectChange = (event) => {
        const newProject = event.detail;
        setSelectedProject(newProject);
      };
  
      window.addEventListener("projectChanged", handleProjectChange);
  
      return () => window.removeEventListener("projectChanged", handleProjectChange);
    }, [navigate]);

  const handleInviteMember = () => {
    const email = prompt("Enter the email address of the new member:");
    if (!email) return alert("No email entered!");

    alert(`Invite sent to ${email}!`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="create-test-cases-title">
              Project Members
            </h2>
                <div className="flex flex-col">
                    {selectedProject ? (
                    <span className="project-name text-sm text-gray-600 mt-1">
                      Project: {selectedProject.name}
                    </span>
                  ) : (
                    <span className="project-name text-sm text-red-500 mt-1">
                      No project selected
                    </span>
                  )}
                </div>
            <button
              onClick={handleInviteMember}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <AiOutlinePlus className="mr-2" />
              Invite Member
            </button>
          </div>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-screen-lg">
          <div className="flex flex-wrap justify-center gap-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-full sm:w-80 md:w-1/3 lg:w-1/4 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-lg font-medium text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProjectMembers;
