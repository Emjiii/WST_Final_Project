import React from 'react';
import { Link } from 'react-router-dom';
import FlowCanvas from '../../components/simulator/FlowCanvas';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/documentation">Documentation</Link></li>
        <li><Link to="FlowCanvas">Simulator</Link></li>
        <li><Link to="/template">Template</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
