import React from 'react';

const SavedWorksPanel = ({ isOpen, onClose, savedWorks }) => {
  return (
    <div 
      className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <button onClick={onClose} className="p-2">Close</button>
      <h2 className="text-lg font-bold">Saved Works</h2>
      <ul>
        {savedWorks.map((work, index) => (
          <li key={index} className="p-2 border-b">{work}</li>
        ))}
      </ul>
    </div>
  );
};

export default SavedWorksPanel; 