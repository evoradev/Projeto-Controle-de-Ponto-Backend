// src/components/AddTask.js

import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDescription) {
      setError('É necessário informar título e descrição.');
      return;
    }

    addTask({
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    setTaskTitle('');
    setTaskDescription('');
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="text" 
        value={taskTitle} 
        onChange={(e) => setTaskTitle(e.target.value)} 
        placeholder="Título" 
      />
      <Input 
        type="text" 
        value={taskDescription} 
        onChange={(e) => setTaskDescription(e.target.value)} 
        placeholder="Descrição" 
      />
      {error && <Error>{error}</Error>}
      <Button type="submit">Adicionar</Button>
    </Form>
  );
};

export default AddTask;
