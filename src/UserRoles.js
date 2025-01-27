import React from "react";

const UserRoles = () => {
  // Example roles data
  const roles = [
    { id: 1, name: "Super Administrator", description: "Has full control over the system, including managing users, roles, projects, and overall tool settings." },
    { id: 2, name: "Project Manager", description: "Oversees project activities, assigns tasks, and monitors progress to ensure timely completion." },
    { id: 3, name: "Project Member", description: "Collaborates within the project by executing assigned tasks, creating test cases, and reporting issues." },
  ];

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 mt-2">User Roles</h1>
      <div className="space-y-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{role.name}</h2>
            <p className="text-gray-700">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoles;
