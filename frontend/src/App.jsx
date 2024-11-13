// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlowCanvas from './components/simulator/FlowCanvas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flowcanvas" element={<FlowCanvas />} />
      </Routes>
    </Router>
  );
};

export default App;
