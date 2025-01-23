import React, { useState, useEffect, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectMembers = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Centralized API configuration
  const API_BASE_URL = "https://testerally-be-ylpr.onrender.com/api";

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchInvitedMembers = useCallback(async () => {
    if (!selectedProject?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/get-invited-members`, {
        params: { projectId: selectedProject.id },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add authentication
        }
      });

      setInvitedMembers(response.data.members || []);
    } catch (error) {
      console.error("Error fetching invited members:", error);
      setError(error.response?.data?.message || "Failed to fetch members");
    } finally {
      setIsLoading(false);
    }
  }, [selectedProject?.id]);

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
  }, [navigate]);

  
  useEffect(() => {
    fetchInvitedMembers();
  }, [fetchInvitedMembers]);

  const handleInviteMember = async () => {
    if (!inviteEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/send-invite/`,
        {
          projectId: selectedProject.id,
          email: inviteEmail,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setInviteEmail("");
        setShowModal(false);
        fetchInvitedMembers(); 
        setError(null);
      } else {
        setError(response.data.message || "Failed to send invite");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      setError(error.response?.data?.message || "An error occurred while sending the invite");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Project Members
              </h2>
              {selectedProject ? (
                <span className="text-sm text-gray-600 mt-1 block">
                  Project: {selectedProject.name}
                </span>
              ) : (
                <span className="text-sm text-red-500 mt-1 block">
                  No project selected
                </span>
              )}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
            >
              <AiOutlinePlus className="mr-2" />
              Invite Member
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              {error}
            </div>
          )}

          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Invited Members
            </h3>
            {isLoading ? (
              <p className="text-gray-500">Loading members...</p>
            ) : invitedMembers.length > 0 ? (
              <ul className="space-y-2">
                {invitedMembers.map((member) => (
                  <li
                    key={member.id}
                    className="p-3 bg-gray-50 border rounded-md flex items-center justify-between"
                  >
                    <span className="text-gray-800 font-medium">
                      {member.email}
                    </span>
                    <span className="text-sm text-gray-500">
                      Status: {member.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No members have been invited yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Invite Member
            </h3>
            <input
              type="email"
              placeholder="Enter member's email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteMember}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMembers;