import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  width: 95%;
  max-width: 800px;
  max-height: 70vh;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const TaskListContainer = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  max-height: calc(70vh - 140px); /* Altura disponível após o cabeçalho */
`;

const App = () => {
  return (
    <TaskProvider>
      <GlobalStyle />
      <AppContainer>
        <Content>
          <HeaderContainer>
          <h1 style={{ textAlign: 'center' }}>To-Do List</h1> {/* Centraliza o título */}
            <AddTask />
          </HeaderContainer>
          <TaskListContainer>
            <TaskList />
          </TaskListContainer>
        </Content>
      </AppContainer>
    </TaskProvider>
  );
};

export default App;
