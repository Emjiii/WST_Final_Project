import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main content of the home page.</p>
        <button onClick={() => 
            window.location.href = '/flowcanvas'}>Simulate
        </button>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
