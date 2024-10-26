import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TaskListContext = createContext();

export const TaskListProvider = ({ children }) => {
  const [taskLists, setTaskLists] = useState([]);

  const fetchTaskLists = async () => {
    try {
      const response = await axios.get('/api/getallTl'); 
      setTaskLists(response.data);
    } catch (error) {
      console.error("Erro ao buscar listas de tarefas:", error);
    }
  };

  const addTaskList = async (title) => {
    try {
      const response = await axios.post('/api/insertTl', { title });
      setTaskLists((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar lista de tarefas:", error);
    }
  };

  const removeTaskList = async (id) => {
    try {
      await axios.delete(`/api/deleteTl/${id}`);
      setTaskLists((prev) => prev.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Erro ao remover lista de tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);

  return (
    <TaskListContext.Provider value={{ taskLists, addTaskList, removeTaskList }}>
      {children}
    </TaskListContext.Provider>
  );
};