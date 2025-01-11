import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";

const TestCases = () => {
    const navigate = useNavigate();
    const [testCases] = useState([
        {
            title: "Login Test",
            requirement: "Verify login functionality using AI models",
            assignee: "John Doe",
            result: "Passed",
            status: "Completed",
        },
        {
            title: "Signup Test",
            requirement: "Validate signup with edge cases",
            assignee: "Jane Smith",
            result: "Failed",
            status: "In Progress",
        },
        {
            title: "Performance Test",
            requirement: "Analyze system load capacity",
            assignee: "AI Bot",
            result: "Pending",
            status: "Pending",
        },
    ]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main content wrapper that adjusts based on sidebar */}
            <div className="flex-1 ml-[300px] transition-all duration-300 max-w-[calc(100%-300px)]">
                <div className="p-6">
                    {/* Header Section */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
                            <div className="flex space-x-4 mb-4 sm:mb-0">
                                <button className="px-4 py-2 text-purple-600 font-medium border-b-2 border-purple-600">
                                    Test Cases
                                </button>
                                <button className="px-4 py-2 text-gray-500 hover:text-purple-600">
                                    Step Groups
                                </button>
                            </div>
                            <button 
                                onClick={() => navigate('/create-testcases')}
                                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                            >
                                <AiOutlinePlus className="mr-2" />
                                Create
                            </button>
                        </div>

                        {/* Search Section */}
                        <div className="p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <h2 className="text-lg font-medium text-gray-700">All Test Cases</h2>
                            <div className="relative w-full sm:w-64">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {testCases.map((testCase, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{testCase.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testCase.requirement}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testCase.assignee}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${testCase.result === 'Passed' ? 'bg-green-100 text-green-800' : 
                                                      testCase.result === 'Failed' ? 'bg-red-100 text-red-800' : 
                                                      'bg-yellow-100 text-yellow-800'}`}>
                                                    {testCase.result}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${testCase.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                                      testCase.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                                      'bg-yellow-100 text-yellow-800'}`}>
                                                    {testCase.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestCases;