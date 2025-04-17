import React, { useState } from "react";
import "./App.css"; // Import the CSS file

// Task Component to display individual tasks
function Task({ task, onDelete, onEdit }) {
  return (
    <tr className="task-container">
      <td>{task}</td>
      <td className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(task)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function App() {
  const [tasks, setTasks] = useState([]); // Store tasks
  const [taskInput, setTaskInput] = useState(""); // Input state
  const [editMode, setEditMode] = useState(false); // Track if we're editing
  const [taskToEdit, setTaskToEdit] = useState(null); // Store task to edit
  const [searchTerm, setSearchTerm] = useState(""); // For searching tasks

  // Add a task
  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput("");
    }
  };

  // Delete a task
  const deleteTask = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  // Set up editing task
  const editTask = (task) => {
    setEditMode(true);
    setTaskToEdit(task);
    setTaskInput(task);
  };

  // Save edited task
  const saveTask = () => {
    setTasks(tasks.map((t) => (t === taskToEdit ? taskInput : t)));
    setTaskInput("");
    setEditMode(false);
    setTaskToEdit(null);
  };

  // Filter tasks by search term
  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">Task Management App</div>

      {/* Navbar with Search */}
      <div className="navbar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Task Input Section */}
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task"
        />
        {editMode ? (
          <button onClick={saveTask}>Save Task</button>
        ) : (
          <button className="add-task-btn" onClick={addTask}>
            Add Task
          </button>
        )}
      </div>

      {/* Task List */}
      <h3>Task List</h3>
      {filteredTasks.length === 0 ? (
        <p className="no-tasks-message">No tasks found!</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <Task
                key={index}
                task={task}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))}
          </tbody>
        </table>
      )}

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2025 Task Management Inc. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
