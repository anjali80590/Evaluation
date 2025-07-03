import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList() {
  const { tasks, toggleTask, deleteTask, updateTask } = useContext(TaskContext);
  const [filter, setFilter] = useState("all"); 
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const completed = tasks.filter((t) => t.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const saveEdit = (id) => {
    updateTask(id, { title: editTitle, description: editDesc });
    setEditingId(null);
  };

  if (tasks.length === 0) {
    return <p>No tasks yet! Add one to get started.</p>;
  }

  return (
    <div>
      <p>
        {completed} of {tasks.length} tasks completed
      </p>

      {/* Filter buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      {filteredTasks.map((task) => (
        <div key={task.id} style={{ marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />

          {editingId === task.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
              <button onClick={() => saveEdit(task.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginLeft: "10px",
              }}
            >
              <strong>{task.title}</strong>{" "}
              {task.description && `- ${task.description}`}
              <button
                onClick={() => startEditing(task)}
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                style={{ marginLeft: "5px" }}
              >
                Delete
              </button>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
