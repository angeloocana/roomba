import React from 'react';
import styled from "styled-components";
import { RoombaGame } from './roomba/RoombaGame';

const AppContainer = styled.main`
  padding: 16px;
`;

function App() {
  return (
    <AppContainer>
      <RoombaGame />
    </AppContainer>
  );
}

export default App;
