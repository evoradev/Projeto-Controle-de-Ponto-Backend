import React, { useState, useContext } from 'react';
import { TaskListContext } from '../context/TaskListContext';
import TaskList from '../components/TaskList';

const MultiTaskListPage = () => {
  const { taskLists, addTaskList, removeTaskList } = useContext(TaskListContext);
  const [newListTitle, setNewListTitle] = useState('');

  const handleAddTaskList = () => {
    if (newListTitle.trim()) {
      addTaskList(newListTitle);
      setNewListTitle('');
    }
  };

  return (
    <div>
      <h1>Gerenciar Listas de Tarefas</h1>
      <input
        type="text"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
        placeholder="Nome da nova lista"
      />
      <button onClick={handleAddTaskList}>Adicionar Lista</button>
      <div>
        {taskLists.map((list) => (
          <div key={list.id}>
            <h2>{list.title}</h2>
            <button onClick={() => removeTaskList(list.id)}>Remover Lista</button>
            <TaskList listId={list.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiTaskListPage;