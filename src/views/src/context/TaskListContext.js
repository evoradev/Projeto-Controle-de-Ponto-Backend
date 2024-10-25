import React, { createContext, useState } from 'react';

export const TaskListContext = createContext();

export const TaskListProvider = ({ children }) => {
  const [taskLists, setTaskLists] = useState([]);

  const addTaskList = (title) => {
    const newTaskList = {
      id: Date.now(),
      title,
      tasks: [],
    };
    setTaskLists([...taskLists, newTaskList]);
  };

  const removeTaskList = (listId) => {
    setTaskLists(taskLists.filter(list => list.id !== listId));
  };

  const addTaskToList = (listId, task) => {
    setTaskLists(taskLists.map(list =>
      list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list
    ));
  };

  const editTaskInList = (listId, task) => {
    setTaskLists(taskLists.map(list =>
      list.id === listId ? {
        ...list,
        tasks: list.tasks.map(t => (t.id === task.id ? task : t)),
      } : list
    ));
  };

  const removeTaskFromList = (listId, taskId) => {
    setTaskLists(taskLists.map(list =>
      list.id === listId ? {
        ...list,
        tasks: list.tasks.filter(t => t.id !== taskId),
      } : list
    ));
  };

  return (
    <TaskListContext.Provider value={{
      taskLists,
      addTaskList,
      removeTaskList,
      addTaskToList,
      editTaskInList,
      removeTaskFromList
    }}>
      {children}
    </TaskListContext.Provider>
  );
};
