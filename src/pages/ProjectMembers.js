import React from "react";

const ProjectMembers = () => {
  const members = [
    { name: "Automation Tester", email: "kumar.testsigma@gmail.com", role: "Test Manager" },
    { name: "K K", email: "kkabap@gmail.com", role: "Test Manager" },
    { name: "Krishna Sakinala", email: "automationtesting2016@gmail.com", role: "Test Manager" },
    { name: "Krishna Kumar", email: "krishna.testsigma@gmail.com", role: "Test Manager" },
  ];

  return (
    <div className="p-6"
    style={{
        display: "flow",
        justifyItems: "center",
        
      }}
      >
      <h2 className="create-test-cases-title mt-6">Project Members</h2>
      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="text-sm text-gray-600 hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{member.name}</td>
                <td className="border border-gray-300 px-4 py-2">{member.email}</td>
                <td className="border border-gray-300 px-4 py-2">{member.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectMembers;
