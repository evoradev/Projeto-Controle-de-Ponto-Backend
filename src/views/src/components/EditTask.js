import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const EditTask = ({ task, onClose }) => {
  const { updateTask } = useTasks();
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, { title: newTitle, description: newDescription });
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="text" 
        value={newTitle} 
        onChange={(e) => setNewTitle(e.target.value)} 
        placeholder="Editar título"
      />
      <TextArea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Editar descrição"
      ></TextArea>
      <ButtonContainer>
        <Button type="submit">Salvar</Button>
        <Button type="button" onClick={onClose}>Cancelar</Button>
      </ButtonContainer>
    </Form>
  );
};

export default EditTask;
