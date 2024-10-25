// src/hooks/useTasks.js

import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export default useTasks;
