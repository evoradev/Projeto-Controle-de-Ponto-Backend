import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import EditTask from './EditTask';
import styled from 'styled-components';

const TaskContainer = styled.li`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const TaskNumber = styled.span`
  font-weight: bold;
  color: #555;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 60px;
  line-height: 1.5em;
  white-space: pre-line;
  cursor: pointer;
  &:hover {
    overflow-y: auto;
  }
`;

const Status = styled.span`
  font-size: 14px;
  color: ${(props) => (props.completed ? '#4CAF50' : '#FFA500')};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#4CAF50' : '#FF6347')};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.primary ? '#45a049' : '#ff4d4d')};
  }
`;

const TaskItem = ({ task, index }) => {
  const { removeTask, toggleTaskCompletion } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <TaskContainer>
      {isEditing ? (
        <EditTask task={task} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <TaskInfo>
            <TaskNumber>{index + 1}.</TaskNumber>
            <Title>{task.title}</Title>
            <Status completed={task.completed}>
              {task.completed ? 'Completo' : 'Em Progresso'}
            </Status>
          </TaskInfo>
          <Description>{task.description}</Description>
          <ButtonContainer>
            <Button primary onClick={() => toggleTaskCompletion(task.id)}>
              {task.completed ? 'Reabrir' : 'Feito'}
            </Button>
            <Button onClick={() => setIsEditing(true)}>Editar</Button>
            <Button onClick={() => removeTask(task.id)}>Remover</Button>
          </ButtonContainer>
        </>
      )}
    </TaskContainer>
  );
};

export default TaskItem;
