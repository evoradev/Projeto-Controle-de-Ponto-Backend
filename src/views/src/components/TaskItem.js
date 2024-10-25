// src/components/TaskItem.js

import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import EditTask from './EditTask';

const TaskItem = ({ task }) => {
  const { removeTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li>
      {isEditing ? (
        <EditTask task={task} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => removeTask(task.id)}>Remove</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
