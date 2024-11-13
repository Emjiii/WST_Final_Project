import HomePage from '../pages/HomePage';
import FlowCanvas from '../components/simulator/FlowCanvas';
// Import other components as needed

const routes = [
  {
    path: '/', 
    element: <HomePage />
  },
  {
    path: '/FlowCanvas', 
    element: <FlowCanvas />
  }, // Add other routes here
];

export default routes;
