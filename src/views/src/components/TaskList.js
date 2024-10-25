import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import styled from 'styled-components';

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <ListContainer>
      {tasks.map((task, index) => (
        <TaskItem key={task.id} task={task} index={index} />
      ))}
    </ListContainer>
  );
};

export default TaskList;
