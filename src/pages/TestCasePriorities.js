import React, { useState } from "react";
import "./RequirementTypes.css";
import { FaEdit, FaTrashAlt, FaPlus, FaCheck, FaTimes } from "react-icons/fa";

const TestCasePriorities = () => {
  const [types, setTypes] = useState([
    "Critical",
    "Major",
    "Medium",
    "Minor",
  ]);

  

  const [addingField, setAddingField] = useState(false);
  const [newType, setNewType] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddClick = () => {
    setAddingField(true);
  };

  const handleAddType = () => {
    if (newType.trim() === "") {
      alert("Type cannot be empty.");
      return;
    }
    setTypes([...types, newType]);
    setNewType("");
    setAddingField(false);
  };

  const handleCancelAdd = () => {
    setNewType("");
    setAddingField(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(types[index]);
  };

  const handleSaveEdit = (index) => {
    if (editValue.trim() === "") {
      alert("Type cannot be empty.");
      return;
    }
    const updatedTypes = [...types];
    updatedTypes[index] = editValue;
    setTypes(updatedTypes);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this type?")) {
      setTypes(types.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
        <div className="p-6">
    <div className="requirement-types-page">
      <div className="requirement-types-header">
        <h2 className="title">Test Case Priorities</h2>
        <button className="add-type-button" onClick={handleAddClick}>
          <FaPlus /> Add
        </button>
      </div>
      <ul className="requirement-types-list">
        {types.map((type, index) => (
          <li key={index} className="requirement-type-item">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="edit-input"
                />
                <button className="save-button" onClick={() => handleSaveEdit(index)}>
                  <FaCheck />
                </button>
              </>
            ) : (
              <div className="requirement-type-content">
                <span>{type}</span>
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(index)}>
                    <FaEdit />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(index)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
        {addingField && (
          <li className="requirement-type-item">
            <input
              type="text"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder="Enter new requirement type"
              className="edit-input"
            />
            <button className="save-button" onClick={handleAddType}>
              <FaCheck />
            </button>
            <button className="cancel-button" onClick={handleCancelAdd}>
              <FaTimes />
            </button>
          </li>
        )}
      </ul>
    </div>
    </div>
    </div>
    </div>
  );
};

export default TestCasePriorities;
