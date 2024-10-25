import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Função para buscar todas as tarefas do backend
  const getAllTasks = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/getall');
      if (!response.ok) throw new Error('Erro ao buscar as tarefas');

      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para adicionar nova tarefa
  const addTask = async (task) => {
    try {
      const response = await fetch('http://localhost:5001/api/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error('Erro ao adicionar a tarefa');
      const savedTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, savedTask]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/delete/${taskId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erro ao remover a tarefa');
      
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`http://localhost:5001/api/updateTask/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar a tarefa');
      }
  
      const updatedTaskData = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTaskData } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`http://localhost:5001/api/update/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar a tarefa');
      }

      const updatedTaskData = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTaskData } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Atualiza o status da tarefa no backend
  const toggleTaskCompletion = async (taskId) => {
    const currentTask = tasks.find(task => task.id === taskId);
    const newCompletionStatus = !currentTask.completed;

    try {
      const response = await fetch(`http://localhost:5001/api/update/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newCompletionStatus }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o status da tarefa');
      }

      const updatedTaskData = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: updatedTaskData.completed } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, editTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};
