import React, { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let { addTask } = useContext(TaskContext);
  let inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  let handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, description});
    setTitle("");
    setDescription("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Desription"
      
        />
        <button type="submit" disabled={!title.trim()}>Add Tasks</button>
      </form>
    </div>
  );
}

export default TaskForm;
