import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import FlowCanvas from './components/FlowCanvas';
// import { AuthProvider } from './components/auth/authContext';

const App = () => (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
);
export default App;
