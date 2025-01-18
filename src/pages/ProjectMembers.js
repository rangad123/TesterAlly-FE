import React from "react";

const ProjectMembers = () => {
  const members = [
    { name: "Automation Tester", email: "kumar.testsigma@gmail.com", role: "Test Manager" },
    { name: "K K", email: "kkabap@gmail.com", role: "Test Manager" },
    { name: "Krishna Sakinala", email: "automationtesting2016@gmail.com", role: "Test Manager" },
    { name: "Krishna Kumar", email: "krishna.testsigma@gmail.com", role: "Test Manager" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">
      <h2 className="create-test-cases-title mb-6">
        Project Members
      </h2>
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
