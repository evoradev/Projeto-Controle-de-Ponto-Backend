// src/context/TaskContext.js

import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask, updatedAt: new Date() } : task
    ));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, editTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};
