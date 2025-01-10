import React, { useState } from "react";
import "./RequirementTypes.css";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  

const RequirementTypes = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleAddTypeClick = () => {
    navigate("/create-requirement");
  };

  const handleEdit = (index) => {
    console.log(`Edit clicked for item at index: ${index}`);
  };

  const handleDelete = (index) => {
    console.log(`Delete clicked for item at index: ${index}`);
  };

  const types = [
    "Customer Requirements",
    "Functional Requirements",
    "Non-Functional Requirements",
    "User Interface Requirements",
  ];

  return (
    <div className="requirement-types-container">
      <div className="header">
        <h2 className="create-test-cases-title">Requirement Types</h2>
        <button className="add-type-button" onClick={handleAddTypeClick}>
          + Add Type
        </button>
      </div>
      <ul className="requirement-types-list">
        {types.map((type, index) => (
          <li
            key={index}
            className="requirement-type-item"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {type}
            {hoveredIndex === index && (
              <div className="action-buttons">
                <button className="edit-button" onClick={() => handleEdit(index)}>
                  <FaEdit /> 
                </button>
                <button className="delete-button" onClick={() => handleDelete(index)}>
                  <FaTrashAlt />  
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequirementTypes;
