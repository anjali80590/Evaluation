import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList() {
  let { tasks, toggleTask } = useContext(TaskContext);
  let completed = tasks.filter((t) => t.completed).length;

  if (tasks.length == 0) {
    return <p>No tasks yet ! Add one to get Started</p>;
  }
  console.log(tasks)
  return (
    <div>
      <p>
        {completed} of {tasks.length} tasks Completed
      </p>
      <ul>
        {tasks.map((task) => {
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
              {task.description && `${task.description}`}
            </span>
          </li>;
        })}
      </ul>
    </div>
  );
}

export default TaskList;
