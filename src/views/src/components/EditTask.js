// src/components/EditTask.js

import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

const EditTask = ({ task, onClose }) => {
  const { editTask } = useTasks();
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(task.id, { title: newTitle, description: newDescription });
    onClose(); // Fecha o modal ou formulário de edição após salvar
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={newTitle} 
        onChange={(e) => setNewTitle(e.target.value)} 
        placeholder="Edit task title"
      />
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Edit description"
      ></textarea>
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditTask;
