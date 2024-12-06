import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/ShareFileModal.css'; // Import the CSS for the modal

const ShareFileModal = ({ isOpen, onClose }) => {
  const [ws, setWs] = useState(null);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [fileContent, setFileContent] = useState(null);


  
  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket("ws://192.168.254.106:3000"); // Replace with your local IP
    setWs(socket);

    socket.onmessage = (event) => {
      const fileData = JSON.parse(event.data);
      setReceivedFiles((prev) => [...prev, fileData]);
    };

    return () => socket.close();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result);
        const fileData = {
          name: file.name,
          content: jsonData,
        };
        ws.send(JSON.stringify(fileData)); // Send JSON file to server
        setFileContent(fileData);
        alert("File sent successfully!");
      } catch (error) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h2>JSON File Sharing</h2>

      {/* File Upload Section */}
      <input type="file" accept=".json" onChange={handleFileChange} />
      {fileContent && (
        <div>
          <h3>Sent File:</h3>
          <pre>{JSON.stringify(fileContent, null, 2)}</pre>
        </div>
      )}

      {/* Received Files Section */}
      <h3>Received Files:</h3>
      <ul>
        {receivedFiles.map((file, index) => (
          <li key={index}>
            <strong>{file.name}</strong>
            <pre>{JSON.stringify(file.content, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

ShareFileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShareFileModal; 