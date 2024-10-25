import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { removeTask } = useContext(TaskContext);

  return (
    <li>
      {task.title}
      <button onClick={() => removeTask(task.id)}>Remove</button>
    </li>
  );
};

export default TaskItem;
